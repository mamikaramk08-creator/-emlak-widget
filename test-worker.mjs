// Run: node test-worker.mjs
// Guards the tenant-isolation rules that are easy to break by accident.
import assert from 'node:assert';
import { originAllowed, TENANTS, buildSystemInstruction } from './worker.js';

const req = (origin) => ({
  headers: { get: (h) => (h === 'Origin' && origin ? origin : null) }
});

// No allowedOrigins configured -> open, so demo.html keeps working.
assert.strictEqual(originAllowed(req('https://anywhere.example'), {}), true);
assert.strictEqual(originAllowed(req(null), {}), true);

// Configured -> exact match only.
const locked = { allowedOrigins: ['https://acmerealty.com'] };
assert.strictEqual(originAllowed(req('https://acmerealty.com'), locked), true);
assert.strictEqual(originAllowed(req('https://evil.example'), locked), false);
assert.strictEqual(originAllowed(req('http://acmerealty.com'), locked), false);
assert.strictEqual(originAllowed(req('https://acmerealty.com.evil.io'), locked), false);
assert.strictEqual(originAllowed(req(null), locked), false);

// KV lead keys are `slug:...`, so a slug containing ':' would let one tenant's
// list({prefix}) reach another tenant's leads.
for (const slug of Object.keys(TENANTS)) {
  assert.ok(!slug.includes(':'), `tenant slug must not contain ':' -> ${slug}`);
}

// A broker evaluating the widget must not get looped back into buy/sell/rent,
// and the bot must not invent a company/team/security story about itself.
const prompt = buildSystemInstruction('Skyline Realty', '');
for (const rule of [
  'NOT EVERY VISITOR IS A PROSPECT',
  'NEVER INVENT FACTS ABOUT YOURSELF',
  'that question is closed for the rest of the conversation',
  'you are an AI assistant'
]) {
  assert.ok(prompt.includes(rule), `system prompt lost rule: ${rule}`);
}
// The banned phrases may only appear inside the ban list itself, never as
// something the bot is told (or allowed) to say.
const banned = prompt.slice(prompt.indexOf('Never claim anything you cannot verify'));
for (const phrase of ['our team', 'our company', 'our servers', 'enterprise-grade']) {
  assert.strictEqual(
    prompt.split(phrase).length - 1,
    banned.split(phrase).length - 1,
    `"${phrase}" appears outside the ban list`
  );
}

console.log('ok');
