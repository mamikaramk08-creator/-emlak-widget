// 910 siteyi elle acmak yerine: her lead'in ana sayfasini cek, bilinen canli
// sohbet saglayicilarinin script izini ara, has_chat_widget kolonunu doldur.
// Cikti: leads-batch1-checked.csv (orijinal dosyaya dokunmaz)
import { readFileSync, writeFileSync } from 'node:fs';

const VENDORS = [
  ['tawk', /tawk\.to/i],
  ['tidio', /tidio(chat)?\./i],
  ['intercom', /intercom(cdn|\.io|settings)/i],
  ['drift', /js\.driftt?\.com|drift\.com\/include/i],
  ['crisp', /client\.crisp\.chat/i],
  ['livechat', /livechatinc\.com/i],
  ['zendesk', /zdassets\.com\/ekr|zopim/i],
  ['hubspot', /js\.hs-scripts\.com|js\.usemessages\.com/i],
  ['olark', /olark\.com/i],
  ['podium', /podium\.com|connect\.podium/i],
  ['birdeye', /birdeye\.com/i],
  ['gohighlevel', /leadconnectorhq\.com/i],
  ['smartsupp', /smartsuppchat|smartsupp\.com/i],
  ['jivo', /jivosite\.com|jivochat/i],
  ['chatway', /chatway\.app/i],
  ['freshchat', /freshchat|wchat\.freshchat|fw-cdn\.com/i],
  ['fb-chat', /fb-customerchat|MessengerCheckbox/i],
  ['elfsight', /elfsight.*chat/i],
  ['structurely', /structurely/i],
  ['readychat', /readychat/i],
  ['landbot', /landbot\.io/i],
  ['manychat', /manychat/i],
  ['chatbot.com', /chatbot\.com\/widget/i],
  ['gorgias', /gorgias\.chat/i],
  ['respond.io', /respond\.io/i],
  ['textline', /textline\.com/i],
  ['pure-chat', /purechat\.com/i],
  ['chatra', /chatra\.io/i],
  ['userlike', /userlike\.com/i],
  ['generic', /(live|ai)[-_]?chat[-_]?(widget|bubble|launcher)/i],
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
  + 'AppleWebKit/537.36 Chrome/128.0 Safari/537.36';

// minimal CSV parser: tirnakli alanlar + gomulu virgul/newline
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
  return rows.filter(r => r.length > 1 || r[0] !== '');
}

const esc = v =>
  /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

async function detect(url) {
  if (!url) return 'NO-SITE';
  if (!/^https?:/i.test(url)) url = 'https://' + url;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
      headers: { 'user-agent': UA },
    });
    if (!res.ok) return `ERR-${res.status}`;
    const html = await res.text();
    const hits = VENDORS
      .filter(([, re]) => re.test(html))
      .map(([n]) => n);
    return hits.length ? hits.join('+') : 'NONE';
  } catch (e) {
    const why = e.name === 'TimeoutError'
      ? 'TIMEOUT'
      : (e.cause?.code || e.name);
    return 'ERR-' + why;
  }
}

const rows = parseCSV(readFileSync('leads-batch1.csv', 'utf8'));
const head = rows[0].map(h => h.replace(/^﻿/, ''));
const iSite = head.indexOf('website');
const iDom = head.indexOf('domain');
const iFlag = head.indexOf('has_chat_widget');
const data = rows.slice(1);

let done = 0;
const queue = data.map((r, i) => i);

async function worker() {
  for (let i; (i = queue.shift()) !== undefined;) {
    data[i][iFlag] = await detect(data[i][iSite] || data[i][iDom]);
    done++;
    if (done % 25 === 0) {
      process.stderr.write(`${done}/${data.length}\n`);
    }
  }
}

// ponytail: 20 eszamanli istek, statik HTML taramasi. JS ile sonradan
// enjekte edilen widget'lari kacirir; kacirma orani onemliyse headless
// tarayiciya gec.
await Promise.all(Array.from({ length: 20 }, worker));

writeFileSync(
  'leads-batch1-checked.csv',
  [head, ...data].map(r => r.map(esc).join(',')).join('\n'),
  'utf8',
);

const tally = {};
for (const r of data) {
  const v = r[iFlag];
  const k = v === 'NONE' ? 'NONE'
    : (v.startsWith('ERR') || v === 'NO-SITE') ? 'ERR/NO-SITE'
    : 'HAS-WIDGET';
  tally[k] = (tally[k] || 0) + 1;
}
console.log(tally);
