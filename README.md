# Real Estate AI Chat Widget

An embeddable AI chat widget for real estate office websites. It chats with
visitors to figure out if they're a buyer, seller, or renter, naturally asks
about budget / neighborhood / bedrooms, then collects a name + phone/email and
emails you the lead.

Sold as a subscription: you deploy the backend once, then every new agency
just pastes two `<script>` tags into their site.

## Files

- `widget.js` — the embeddable chat widget (host this file publicly, e.g. on
  Cloudflare Pages or GitHub + jsDelivr).
- `worker.js` — Cloudflare Worker that proxies Gemini (chat) and Resend
  (lead email). This is where your API keys actually live — never in
  `widget.js`, which runs in every visitor's browser.
- `demo.html` — a fake agency landing page with the real widget embedded, for
  demoing to prospects.
- `admin.html` — a simple lead-viewing dashboard (host this publicly too, or
  just open it locally). Lets you pull stored leads for a tenant.

## 1. Deploy the Worker (one-time setup)

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Create Worker**. No OAuth, just your normal Cloudflare login.
2. Give it a name (e.g. `realestate-widget-api`) and deploy the default
   "Hello World" worker.
3. Click **Edit code**, delete everything, paste in the contents of
   `worker.js`, then **Deploy**.
4. Go to **Settings → Variables and Secrets** on the worker and add three
   secrets (encrypt them):
   - `GEMINI_API_KEY` — your Google Gemini API key
   - `RESEND_API_KEY` — your Resend API key (sign up free at resend.com)
   - `ADMIN_KEY` — any secret string you make up yourself (e.g. a long random
     password). This protects the `/leads` dashboard endpoint below — anyone
     with this key can read stored leads, so keep it private.
5. Note the worker's URL, shown at the top of the dashboard:
   `https://realestate-widget-api.<your-subdomain>.workers.dev`

That's it — this single Worker serves every agency you sign up. You never
touch it again unless you want to change the conversation script (edit the
`buildSystemInstruction` function in `worker.js` and redeploy).

**Resend sandbox note:** without verifying a domain, Resend can only deliver
to your own account email — regardless of what `notifyEmail` you set for a
tenant. This is fine for demos, but **required to fix before onboarding any
real customer**, since their leads otherwise silently fail to arrive.

### Setting up your own sending domain (required before real customers)

1. Go to https://resend.com/domains → **Add Domain**, and enter a domain you
   own (e.g. `youragency.com`, or a subdomain like `mail.youragency.com`).
2. Add the DNS records Resend gives you (usually an SPF/TXT record and a
   DKIM CNAME, sometimes DMARC) at your DNS provider (Cloudflare DNS,
   Namecheap, etc.).
3. Wait for verification — this can take a few minutes to a few hours.
   Resend's dashboard will show the domain status as **Verified** once done.
4. In `worker.js`, update the `FROM_EMAIL` constant (near the top, right
   after `TENANTS`) to an address on your verified domain, e.g.
   `'leads@youragency.com'`. Paste the updated file into the Cloudflare
   dashboard and click **Deploy**.
5. Test it: trigger a `/lead` request (e.g. run through the demo chat) and
   confirm the email actually arrives at the tenant's real `notifyEmail`
   address, not just your own account email.

### Storing leads + the admin dashboard (recommended)

By default, leads are only ever delivered by email — if an email bounces,
gets lost, or lands in spam, that lead is gone for good. Adding a Cloudflare
KV namespace stores every lead as a backup you can browse anytime with
`admin.html`.

1. In the Cloudflare dashboard, go to **Storage & Databases → KV** → **Create
   namespace**. Name it anything, e.g. `realestate-leads`.
2. Go back to your Worker → **Settings → Bindings** → **Add binding** → **KV
   namespace**. Set the variable name to exactly `LEADS_KV` and select the
   namespace you just created. Save.
3. Make sure you've also added the `ADMIN_KEY` secret from step 4 above.
4. Open `admin.html` (locally, or host it wherever you host `widget.js`) and
   fill in your worker URL, a `tenantId`, and your `ADMIN_KEY` — click
   **Getir** to see that tenant's stored leads.

If `LEADS_KV` isn't bound, everything still works exactly as before (email
only) — the Worker skips KV storage silently.

### Adding a new customer (tenant)

Before onboarding a real customer, make sure you've completed the sending
domain setup above — otherwise their lead emails won't be delivered.

Each agency gets its own entry in the `TENANTS` object near the top of
`worker.js`, which controls which email address their leads go to and also
acts as an allowlist (unknown tenant IDs get a `403`):

```js
const TENANTS = {
  'skyline-demo': { notifyEmail: 'mamikaramk08@gmail.com' },
  'acme-realty': { notifyEmail: 'leads@acmerealty.com' }
};
```

Add one line, paste the updated `worker.js` into the Cloudflare dashboard,
click **Deploy** — then give the new agency their `tenantId` (e.g.
`acme-realty`) to use in their embed snippet below.

## 2. Host `widget.js`

Any static file host works. Two zero-cost options:

- **Cloudflare Pages**: create a Pages project, upload `widget.js` (and
  `demo.html` if you want a hosted demo too). You'll get a URL like
  `https://your-project.pages.dev/widget.js`.
- **GitHub + jsDelivr**: push this repo to GitHub, then use
  `https://cdn.jsdelivr.net/gh/<user>/<repo>/widget.js` as the script URL.

## 3. Give each new agency this snippet

This is the entire "installation" — the two-minute pitch is: *"Paste this
into your site's HTML, right before `</body>`, and the chat widget is live."*

```html
<script>
  window.RealEstateWidgetConfig = {
    agencyName: "ABC Realty",
    primaryColor: "#0B5FFF",
    proxyBaseUrl: "https://realestate-widget-api.<your-subdomain>.workers.dev",
    tenantId: "acme-realty"
  };
</script>
<script src="https://<where-you-hosted>/widget.js"></script>
```

`tenantId` must match an entry you added to `TENANTS` in `worker.js` (see
above) — the widget refuses to run without it, and the Worker rejects
requests from unknown tenant IDs.

Optional config fields:

- `agencyBlurb` — one sentence describing the agency, injected into the AI's
  context (e.g. `"a boutique agency specializing in downtown condos"`).
- `logoUrl` — small logo shown in the chat header.

Every field except `proxyBaseUrl`, `tenantId`, and `agencyName` is optional.

## Testing before a sales call

1. Open `demo.html` locally in a browser, click the chat bubble, and run
   through a full conversation (buyer → budget → neighborhood → bedrooms →
   name + phone → closing message).
2. Confirm the lead email arrives at the `notifyEmail` set for that tenant in
   `TENANTS` (in `worker.js`).
3. Paste the snippet into a second, unrelated blank HTML page to confirm it
   works standalone, not just inside `demo.html`.
4. Resize the browser to a phone width to confirm the panel goes full-screen.
5. Temporarily set `proxyBaseUrl` to a bad URL to confirm the widget shows a
   graceful fallback message instead of breaking.
6. Click one of the quick-reply buttons (Buying/Selling/Renting) shown after
   the opening greeting and confirm it sends that reply.
7. Refresh the page mid-conversation and confirm the chat history is still
   there (session persistence).
8. Leave the page open without clicking the bubble for ~8 seconds and confirm
   a small red pulse appears on it.
9. If you've set up `LEADS_KV` and `ADMIN_KEY`, open `admin.html`, enter the
   worker URL / tenant ID / admin key, and confirm the test lead you just
   generated shows up in the table.
