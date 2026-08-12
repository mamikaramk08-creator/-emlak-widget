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

**Merge tags (2026-08-08 — converted to Instantly syntax, paste as-is):**
the bodies below now use the exact column names in
`instantly-import.csv`, so they render without remapping:
`{{firstName}}`, `{{companyName}}`. A tag that doesn't match a column
renders **empty** in Instantly — `Hi ,` to 821 people — so if you rename a
column on import, rename it here too.

Sender name is hardcoded as **Muhammet Karakaş** (full name, matching the
reference campaign's signature style) — not a merge tag, nothing to map.

**CAN-SPAM:** every email below ends with a physical mailing address —
required for commercial email (up to $51,744 per email, not per campaign).
Address in use: `Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye`. The
manual unsubscribe line was removed: Instantly's account/campaign-level
auto-appended opt-out link (Settings → Compliance) is being used instead,
so confirm that's enabled before sending to avoid shipping with no opt-out
at all.

---

## Email 1 — Day 0

### Subject line variants (A/B/C test)

> **2026-08-08 — do NOT run the 3-way split on batch 1. Send variant A to
> all 821.** Reference point: Burhan Kocabıyık's live Instantly campaign
> runs 4 body variants per step — at 408K sent. We have 821. Split 3 ways
> and each cell is 273 leads; at a 3-6% reply rate that's 8-16 replies per
> cell, and the difference between variants is noise, not signal (see
> `cold-email-orneklem-buyuklugu` — under 200-300 per cell you're measuring
> nothing). One variant across 821 gives one readable number. Variants are
> for deliverability rotation at volume, which is not our problem yet.
>
> B and C stay below as the queue for batch 2+, once batch 1 has produced a
> baseline reply rate to beat.

Body stays identical across all three — only the subject line changes.

- **A — Curiosity/question (baseline):**
  `Quick question about missed leads on {{companyName}}'s website`
- **B — Loss-aversion/specific:**
  `{{companyName}} may be losing leads it already paid for`
- **C — Direct/benefit-led:**
  `A 5-minute fix for {{companyName}}'s website leads`

Body below is variant A's subject line; swap in B or C when setting up the
split test — do not send this note itself.

```
Subject: Quick question about missed leads on {{companyName}}'s website

Hi {{firstName}},

I noticed {{companyName}}'s site doesn't have a live chat — most visitors who
aren't ready to call just leave, and that's lead volume you're already
paying for (SEO/ads) but never capturing.

I put together a short video showing exactly how an AI chat widget would
work on {{companyName}}'s site — figures out if a visitor's buying, selling,
or renting, asks about budget/area, then gets you their contact info right
away.

Want me to send it over?

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 2 — Day 2-3

```
Subject: (LEAVE EMPTY in Instantly — empty subject threads this under Step 1)

Hi {{firstName}},

Following up in case this got buried.

Still happy to send that short video showing how it'd work on
{{companyName}}'s site — just reply "send it" and I'll get it over to you.

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 3 — Day 5-7 (new angle)

Shifts from "your website" to "your inbox" — the second half of the
combined offer, not just a repeat of email 1/2.

This is the one step where breaking the thread is defensible, since the
angle changes. If you want it as a fresh thread instead of a blank
subject, use: `The other half of this — your inbox, not just your site`

```
Subject: (LEAVE EMPTY — same thread)

Hi {{firstName}},

Quick add to my last note: the same system also covers the other side —
when a lead emails {{companyName}} directly, it reads the email, drafts a
reply, and flags anything that looks like a hot lead so it doesn't sit
behind newsletters and CC threads.

Still happy to send the short video walkthrough if it's useful — just say
the word.

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

## Email 4 — Day 10-14 (breakup)

```
Subject: (LEAVE EMPTY — same thread)

Hi {{firstName}},

Haven't heard back, so I'll assume the timing isn't right — I'll stop
following up after this one.

If missed leads (on the site or in the inbox) ever become a priority for
{{companyName}}, just reply to this email and I'll send over the video.

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

---

## Reference: Burhan Kocabıyık's live campaign (2026-08-08)

Screenshots of his actual Instantly setup (LeftFlow, 408K sent, 5.95% reply,
open/click both showing 0% = tracking off, as documented in
`araştırma/youtube-outreach-arastirmasi-2026-07-28.md` §10).

**Taken:**
- Follow-ups leave the subject line **empty** so Instantly threads them
  under Step 1. We were writing a literal `Re:` into a fresh subject, which
  starts a *new* thread wearing a fake `Re:` — reads as a cold-email tell.
- Plain-text brand line in the signature, `InboxAgent | getboxagent.com`,
  mirroring his `LeftFlow | www.leftflow.ai`. He shows the name and
  explicitly notes it isn't blue/clickable. An earlier version of this file
  dropped the domain out of auto-linkify fear — wrong call: the whole point
  of a linkless email is that a curious prospect can still reach you, and
  "InboxAgent" alone doesn't lead anywhere (the site is at getboxagent.com,
  not inboxagent.com). **After pasting, check the domain isn't blue**; if
  Instantly linkified it, select it and remove the link.
- Step gap of 3 days — already matched.

**Not taken — the CTA.** His every step closes with *"15 dakikalık bir
online görüşme yapabilir miyiz?"*. Ours stays reply-gated video → async
checkout, no call anywhere. See `kapanis-modeli-async-tercih`: the decision
predates this reference and this reference doesn't override it.

**Not taken — 4 body variants per step.** Volume mismatch, see the note
under Email 1.

---

## Batch 2 — the 46 leads that already have a live chat

`leads-batch2-haschat.csv`. Detected vendors: Facebook Messenger badge
(13), HubSpot (6), Birdeye (6), GoHighLevel (5), Tawk (4), Elfsight (3),
rest scattered.

**Why these can't get Email 1:** its opening line asserts the prospect has
no live chat. Nothing else about the offer changes — we sell the widget
*and* the inbox agent, and the inbox half doesn't care what's on their
site.

**So batch 2 leads with the inbox angle instead.** Steps 2 and 4 below are
unchanged from batch 1 (they name no site fact); only steps 1 and 3 swap.

### Batch 2 — Email 1, Day 0

```
Subject: What happens to {{companyName}}'s emailed leads at 9pm?

Hi {{firstName}},

When someone emails {{companyName}} about a listing outside office hours,
how long before they hear back? For most brokerages the honest answer is
next morning, and by then they've messaged two other agents.

I put together a short video showing a system that reads inbound emails,
drafts the reply in your voice, and flags the ones that look like real
buyers so they don't sit behind newsletters and CC threads.

Want me to send it over?

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

### Batch 2 — Email 3, Day 5-7

Only now does the chat come up, and it doesn't claim theirs is bad — it
asks what it does after hours. That's answerable and specific, and every
vendor on the list above is either human-staffed or form-based.

```
Subject: (LEAVE EMPTY — same thread)

Hi {{firstName}},

One more angle: I saw {{companyName}}'s site already has a chat. Worth
asking what it does at 11pm — most of them either wait for a person or
collect a name and email and stop there.

The one in the video qualifies the visitor first: buying, selling or
renting, budget, area, timeline, then hands you the contact with that
context attached.

Still happy to send it if it's useful.

Muhammet Karakaş
InboxAgent | getboxagent.com

Atatürk Bulvarı No:155, Nazilli/Aydın, Türkiye
```

**Send batch 2 after batch 1, not alongside it.** 46 leads is far too few
to read a reply rate from on its own; its only real use is as a second
data point once batch 1 has produced a baseline.
