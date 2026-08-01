# Cold Email Sequence — US Real Estate Brokerages

> **2026-07-31 — expanded to 4 touches, links removed from the automated
> sequence, CTA switched to reply-gated video.** Per
> `us-plan-agustos-2026.md`: only a video link goes out in the manual reply
> once a prospect says "send it" — no calendar/call-booking link anywhere
> in this flow, closing happens async via checkout. None of the 4 automated
> touches below carry a hyperlink, including the company/product name.
> Cadence: day 0 / 2-3 / 5-7 / 10-14 (Instantly Benchmark 2026 / Saleshandy:
> 42% of replies come from follow-ups, 3-5 step sequences hit 8.3% reply
> rate vs 4.1% for single-touch). Cap sends at 30/mailbox/day, stop at 2%
> bounce — see `cold-email-gonderim-limitleri-2026.md`.

**Merge tag note:** this file was originally written for GMass
(single-brace `{Tag}`, case-sensitive, must match sheet columns exactly).
The active campaign draft ("TX Real Estate Brokerages" / "Keyleads") is now
set up in **Instantly**, which uses double-brace `{{Tag}}` syntax — swap
`{FirstName}` → `{{firstName}}` etc. when pasting these into Instantly's
sequence editor. Sheet/lead-list columns needed either way: `FirstName`,
`AgencyName`, `SenderName`.

**CAN-SPAM:** every email below ends with a physical mailing address —
required for commercial email (up to $51,744 per email, not per campaign).
Address in use: `Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye`. The manual unsubscribe line was removed:
Instantly's account/campaign-level auto-appended opt-out link (Settings →
Compliance) is being used instead, so confirm that's enabled before
sending to avoid shipping with no opt-out at all.

---

## Email 1 — Day 0

### Subject line variants (A/B/C test)

Body stays identical across all three — only the subject line changes.
Split the batch evenly across the three variants, track open rate and
reply rate per variant before picking a winner for the next batch.

- **A — Curiosity/question (baseline):**
  `Quick question about missed leads on {AgencyName}'s website`
- **B — Loss-aversion/specific:**
  `{AgencyName} may be losing leads it already paid for`
- **C — Direct/benefit-led:**
  `A 5-minute fix for {AgencyName}'s website leads`

Body below is variant A's subject line; swap in B or C when setting up the
split test — do not send this note itself.

```
Subject: Quick question about missed leads on {AgencyName}'s website

Hi {FirstName},

I noticed {AgencyName}'s site doesn't have a live chat — most visitors who
aren't ready to call just leave, and that's lead volume you're already
paying for (SEO/ads) but never capturing.

I put together a short video showing exactly how an AI chat widget would
work on {AgencyName}'s site — figures out if a visitor's buying, selling,
or renting, asks about budget/area, then gets you their contact info right
away.

Want me to send it over?

{SenderName}

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 2 — Day 2-3

```
Subject: Re: Quick question about missed leads on {AgencyName}'s website

Hi {FirstName},

Following up in case this got buried.

Still happy to send that short video showing how it'd work on
{AgencyName}'s site — just reply "send it" and I'll get it over to you.

{SenderName}

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 3 — Day 5-7 (new angle)

Shifts from "your website" to "your inbox" — the second half of the
combined offer, not just a repeat of email 1/2.

```
Subject: The other half of this — your inbox, not just your site

Hi {FirstName},

Quick add to my last note: the same system also covers the other side —
when a lead emails {AgencyName} directly, it reads the email, drafts a
reply, and flags anything that looks like a hot lead so it doesn't sit
behind newsletters and CC threads.

Still happy to send the short video walkthrough if it's useful — just say
the word.

{SenderName}

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 4 — Day 10-14 (breakup)

```
Subject: Should I stop reaching out?

Hi {FirstName},

Haven't heard back, so I'll assume the timing isn't right — I'll stop
following up after this one.

If missed leads (on the site or in the inbox) ever become a priority for
{AgencyName}, just reply to this email and I'll send over the video.

{SenderName}

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```
