// Bedava on eleme: e-posta domaini icin MX kaydi var mi? Yoksa garanti
// bounce. Mailbox'in gercekten var olup olmadigini SOYLEMEZ - onun icin
// ucretli verifier gerekiyor.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolveMx } from 'node:dns/promises';

function parseCSV(text) {
  const rows = [[]];
  let field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else q = false;
      } else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { rows.at(-1).push(field); field = ''; }
    else if (c === '\n') {
      rows.at(-1).push(field); field = ''; rows.push([]);
    } else if (c !== '\r') field += c;
  }
  rows.at(-1).push(field);
  return rows.filter(r => r.length > 1);
}

const esc = v =>
  /[",\n]/.test(v ?? '')
    ? `"${v.replace(/"/g, '""')}"`
    : (v ?? '');

const rows = parseCSV(readFileSync('leads-batch1-send.csv', 'utf8'));
const head = rows[0].map(h => h.replace(/^﻿/, ''));
const iMail = head.indexOf('email');
const data = rows.slice(1);
head.push('mx');

// ayni domain tekrar tekrar sorulmasin
const cache = new Map();

function classify(records) {
  if (!records.length) return 'NO-MX';
  const first = records[0].exchange;
  if (/google|googlemail/i.test(first)) return 'GOOGLE';
  if (/outlook|microsoft/i.test(first)) return 'MS365';
  return 'OK';
}

async function mx(dom) {
  if (!cache.has(dom)) {
    cache.set(dom, resolveMx(dom).then(classify, e =>
      e.code === 'ENOTFOUND' || e.code === 'ENODATA'
        ? 'NO-MX'
        : 'DNS-ERR'));
  }
  return cache.get(dom);
}

const VALID = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;
const q = data.map((_, i) => i);

await Promise.all(Array.from({ length: 30 }, async () => {
  for (let i; (i = q.shift()) !== undefined;) {
    const e = (data[i][iMail] || '').trim();
    data[i].push(
      VALID.test(e) ? await mx(e.split('@')[1].toLowerCase()) : 'BAD-SYNTAX',
    );
  }
}));

writeFileSync(
  'leads-batch1-send.csv',
  [head, ...data].map(r => r.map(esc).join(',')).join('\n'),
  'utf8',
);

const t = {};
for (const r of data) t[r.at(-1)] = (t[r.at(-1)] || 0) + 1;
console.log(t, '| tekil domain:', cache.size);
