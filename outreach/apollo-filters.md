# Apify Lead Finder — Filter Checklist

Apollo dropped (too expensive — Burhan doesn't use it either, uses Apify/
Leadmesh instead, ~7-10x cheaper). Same filter set applies to Apify.

Use this exact filter set for the first lead-list pull.

- **Industry:** Real Estate
- **Title:** Owner, Broker, Broker-Owner, Managing Broker, Principal, Founder
  (small firms → the broker-owner is the buyer, no marketing-director layer)
- **Company size:** 1–50 employees
- **Location:** United States — **split the first batch across 4 states
  instead of 1-2.** Real estate agents are a nationally over-solicited
  profession (cold-email/cold-call fatigue is vertical-wide, not state-
  specific), but TX/FL are also the largest agent populations and the most
  visible to competing vendors (case-study targets), so don't put the whole
  first batch in one basket. Pull ~250-500 contacts each from:
  - **Texas** — largest pool, existing target
  - **Florida** — 2nd largest pool, existing target
  - **Georgia** — mid-size pool, lower vendor-spotlight exposure
  - **North Carolina** — mid-size pool, lower vendor-spotlight exposure

  Tag every lead with a **State** column (values: TX / FL / GA / NC) in the
  export and carry it through to the Instantly/Sheets lead list — this is
  required to measure reply rate per state later, not optional metadata.
  Expand beyond these 4 once reply-rate data comes in.
- **Exclude:** corporate/franchise HQ accounts (RE/MAX corporate, Compass
  corporate, Coldwell Banker corporate, etc.) — independents only
- **Email:** verified email required

## Chat-widget pass — automated (2026-08-08)

Run `node check-widgets.mjs` in this folder: fetches every lead's homepage,
greps for ~29 live-chat vendors' script tags, fills `has_chat_widget`.
910 leads in ~1 minute. Do NOT do this by hand (an earlier version of this
file said to — it was wrong; the pass elimination is only ~5%, nowhere near
worth 910 manual page loads).

Existing chat is **not** a disqualifier — we sell the widget *and* the
inbox agent, so those leads go to a separate batch whose day-0 email leads
with the inbox angle. It only disqualifies a lead from **Email 1 as
written**, whose opening line asserts the prospect has no live chat.

First-batch result: 704 no chat, 46 have one, 160 unscannable (68 of those
are 403 bot-blocks — site is fine, we just couldn't read it; those ship in
batch 1, ~6% of them will have chat). Splits:

- `leads-batch1-send.csv` — 831 (TX 314 / FL 180 / GA 171 / NC 166).
  Gets Email 1 as written.
- `leads-batch2-haschat.csv` — 46. Needs a rewritten opening line first.
- `leads-dead.csv` — 33 dropped. Domain doesn't resolve or 404s, so the
  email will bounce too.

## Batch size

First pull: 1,000–2,000 contacts total (~250-500 per state above), narrow
filters as above (300 is too small a sample — reply rate swings 0.8%–13% by
segment, so under 1,000 you're measuring noise, not signal). Spot-check the
first 10 results per state by hand (right title, plausible independent
brokerage, real US location, State tag correct) before pulling the full
batch.
