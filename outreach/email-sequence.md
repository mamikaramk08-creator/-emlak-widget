# Cold Email Sequence — US Real Estate Brokerages

Two emails, sent via GMass from the warmed-up outreach domain (not the
brand domain — see the plan's domain-strategy notes). No "book a call" ask
anywhere: the CTA is always the self-serve demo link plus a reply-by-email
loop, so the entire sales process stays written/async end to end.

GMass merge tags use single curly braces and must match the sheet's column
headers exactly (case-sensitive) — not the double-brace `{{Tag}}` syntax
Instantly uses. Sheet columns: `FirstName`, `AgencyName`, `SenderName`.
`DemoLink` isn't a per-row column — either add it as a column with the same
value on every row, or hardcode the URL below since it's the same for everyone.

`{DemoLink}` = `https://mamikaramk08-creator.github.io/-emlak-widget/demo.html`
(GitHub Pages, live as of 2026-07-18).

## Email 1

### Subject line variants (A/B/C test)

Body stays identical across all three — only the subject line changes.
Split the batch evenly across the three variants using your sending
tool's split-test feature (check whether it auto-rotates or needs manual
list segmentation), then track open rate and reply rate per variant
before picking a winner for the next batch.

- **A — Curiosity/question (baseline):**
  `Quick question about missed leads on {AgencyName}'s website`
- **B — Loss-aversion/specific:**
  `{AgencyName} may be losing leads it already paid for`
- **C — Direct/benefit-led:**
  `A 5-minute fix for {AgencyName}'s website leads`

Body below is variant A's subject line; swap in B or C from above when
setting up the GMass split test — do not send this note itself.

```
Subject: Quick question about missed leads on {AgencyName}'s website

Hi {FirstName},

I noticed {AgencyName}'s site doesn't have a live chat — most visitors who
aren't ready to call just leave, and that's lead volume you're already paying
for (SEO/ads) but never capturing.

I built a simple AI chat widget made for real estate sites: it figures out if
a visitor is buying, selling, or renting, asks about budget/area, then emails
you their name and contact info right away. No CRM to learn — it installs
with one script tag and is live in under 5 minutes.

You can try the live demo yourself here, no signup needed: {DemoLink}

If it looks useful, just reply to this email and I'll get {AgencyName} set
up.

{SenderName}
```

## Email 2 (sent 3 days later if no reply)

```
Subject: Re: Quick question about missed leads on {AgencyName}'s website

Hi {FirstName},

Following up in case this got buried — here's that live demo again:
{DemoLink}

Takes about 60 seconds to try. Happy to answer anything right here by email.

{SenderName}
```
