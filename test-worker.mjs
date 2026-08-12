// Run: node test-worker.mjs
// Guards the tenant-isolation rules that are easy to break by accident.
import assert from 'node:assert';
import { originAllowed, TENANTS } from './worker.js';

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

console.log('ok');
