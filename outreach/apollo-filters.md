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

## Manual secondary pass (mandatory for the first batch)

Spot-check each prospect's website for an existing live-chat widget
(Intercom / Drift / Tidio / etc. script tags) and **drop** (not just
deprioritize) agencies that already have one. This is the strongest
available signal for standing out from the generic "AI chatbot" pitch
flooding this vertical — more important than which state a lead is in — so
for the first batch it's a required filter, not an optional pass. Do this by
hand rather than building automation for it yet.

## Batch size

First pull: 1,000–2,000 contacts total (~250-500 per state above), narrow
filters as above (300 is too small a sample — reply rate swings 0.8%–13% by
segment, so under 1,000 you're measuring noise, not signal). Spot-check the
first 10 results per state by hand (right title, plausible independent
brokerage, real US location, State tag correct) before pulling the full
batch.
