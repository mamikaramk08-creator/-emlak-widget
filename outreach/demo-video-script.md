# Demo Video — Script & Recording Guide

> The reply-gated asset for `email-sequence.md`. All four touches promise
> *"a short video showing exactly how an AI chat widget would work on
> {{companyName}}'s site"* — so the video has to show **their** site, not
> ours. That's what the recording method below solves.
>
> Target length **70-80 seconds**. Anything past 2 minutes doesn't get
> watched.

---

## 1. How to record it "inside their site"

The widget is a self-contained script driven by one global config object
(`widget.js:18`). Nothing needs to be installed on their server — paste
the config + loader into the DevTools console **on their live homepage**
and the widget appears on their page, in their browser tab, chatting for
real through the Cloudflare Worker.

### Setup (once)

- Fresh Chrome profile or new window: no bookmarks bar, no personal tabs,
  no extensions visible. Their site + one Gmail tab, nothing else.
- Window at 1280x720 (or 1920x1080 and record the window, not the screen).
- Page zoom 100%.
- Recorder: **Windows Game Bar** (`Win`+`Alt`+`R`) — records the active
  window straight to `.mp4`, nothing to install. ScreenPal free works too
  if you want to trim afterwards. We host the file ourselves (§3), so no
  Loom/YouTube account is involved.

### Per prospect (3-4 minutes once you've done it twice)

1. Open their homepage. Grab their brand color — right-click their main
   button → Inspect → copy the hex.
2. Open the console (`F12`) and paste:

```js
window.RealEstateWidgetConfig = {
  agencyName: "Acme Realty",                       // ← their name
  agencyBlurb: "a residential real estate agency in Austin, TX", // ← theirs
  primaryColor: "#0B5FFF",                         // ← their hex
  proxyBaseUrl: "https://realestate-widget-api.mamikaramk08.workers.dev",
  tenantId: "skyline-demo"
};
var s = document.createElement('script');
s.src = "https://cdn.jsdelivr.net/gh/mamikaramk08-creator/-emlak-widget@main/widget.js";
document.body.appendChild(s);
```

   `tenantId` stays `skyline-demo` — that's the only tenant the worker
   knows (`worker.js:22`), and it routes the captured lead to
   `mamikaramk08@gmail.com`, which is exactly what you want for Beat 4.

3. Rehearse the chat once with the recorder off. Then record.

### If the widget doesn't appear

Check the console. A `Content-Security-Policy` error means their site
blocks third-party scripts. Fix without an extension:

DevTools → **Network** → right-click the document request → **Override
headers** → delete the `content-security-policy` row → reload → paste
again. Most small brokerage sites (Wix, WordPress, IDX templates) have no
CSP at all, so try the plain paste first.

If a site fights back twice, move on — pick another prospect. Don't burn
20 minutes on one page.

### Honesty line

Say it once, on screen: *"Running on your live site from my browser —
nothing installed on your end."* It's true, it kills the "is this
faked?" reaction, and it makes the effort visible.

---

## 2. The script

Two tracks: **CAPTION** is the on-screen text (large, top-center, one
line, stays up for the whole beat). **VO** is what you read. Read at
normal speed — short sentences, no rushing. If the voice take isn't
landing after three tries, ship it captions-only with light background
music; a silent screen recording with good captions converts fine and
costs you nothing in accent risk.

---

**BEAT 1 — 0:00-0:08 · Their homepage, slow scroll past listings**

CAPTION: `This is acmerealty.com. Right now.`

VO:
> This is your website. A visitor lands here, looks at two or three
> listings, and leaves. You never find out who they were.

---

**BEAT 2 — 0:08-0:18 · Widget bubble appears bottom-right, click it open**

CAPTION: `One line of code. Your name, your color.`

VO:
> Here is the same page with the chat widget on it. It takes one line of
> code, and it uses your name and your brand color.

*Small on-screen note, bottom corner, 4 seconds:*
`Running on your live site from my browser — nothing installed on your end.`

---

**BEAT 3 — 0:18-0:48 · The chat. This is the beat that sells.**

The widget opens with:
*"Hi! I'm here to help with your real estate search. Are you looking to
buy, sell, or rent?"*

Type as the visitor — real typing, don't paste, it looks staged:

1. `Buying. Looking for a 3 bed around $450k`
2. (it acknowledges, asks the area) → `Near Mueller if possible`
3. (it asks for contact) → `Jason Miller, 512-555-0143`
4. It confirms someone from **their agency name** will follow up.

CAPTION (swap at ~0:30): `Buy, sell or rent · Budget · Area · Bedrooms`

VO:
> It asks the same questions your team would ask. Buying, selling or
> renting. Budget. Area. How many bedrooms. One question at a time, and
> it never asks the same thing twice. Then it asks for a name and a
> number.

---

**BEAT 4 — 0:48-1:00 · Cut to the Gmail tab. The lead email is there.**

Open it. Subject reads `New real estate lead — Acme Realty`. Scroll the
body so name / contact / role / budget / area / bedrooms are all visible.

CAPTION: `In your inbox. Seconds later.`

VO:
> The moment it has a name and a number, the lead is in your inbox, with
> everything the visitor said attached. No new software to log into.

---

**BEAT 5 — 1:00-1:10 · Back to their site, widget open**

CAPTION: `11pm on a Sunday. Same answer.`

VO:
> It runs around the clock, so the visitor at eleven at night gets an
> answer instead of a contact form. And the same system can watch your
> inbox and draft the replies to leads who email you directly.

---

**BEAT 6 — 1:10-1:18 · End card, plain background**

CAPTION (three lines, hold to the end):
```
$0 setup · 7-day free trial
Live on your site this week
getboxagent.com
```

VO:
> If you want it on your site, just reply to my email and I'll have it
> live this week.

**No price spoken.** The landing page carries the three tiers ($149
widget / $299 inbox / $399 both, `landing/index.html:360-393`) — let the
video sell the mechanism and let the page do the pricing.

---

## 3. Where the video lives

**On our own site, no third-party player, no hyperlink in the email.**

`landing/index.html` now has a `#demo` section holding a plain HTML5
`<video>` that reads `landing/assets/demo.mp4`. Cloudflare Pages serves
it — static files, unmetered bandwidth, 25 MB per-file cap (a 75-second
720p screen recording lands around 8-15 MB, so it fits with room).

To publish: drop the export at `landing/assets/demo.mp4`, then

```
cd "ABD emlak projesi/emlak-widget-global"
npx wrangler pages deploy landing --project-name=getboxagent-site
```

Encode at **1280x720, H.264, AAC, under 20 MB**. Game Bar output is
usually fine as-is; if it comes out fat:
`ffmpeg -i in.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 96k demo.mp4`

### The reply that carries it

No hyperlink anywhere — the domain sits in plain text, same as the
signature, and the video is the first thing on the page.

```
Subject: (reply in thread)

Hi {FirstName},

It's up on getboxagent.com — 75 seconds, right at the top of the page,
no signup. It's a recording of your own homepage with the widget running
on it.

If you want it on the real thing, I can have it live this week — $0
setup, 7-day free trial, cancel inside the trial and you're not charged.

Muhammet Karakaş
InboxAgent | getboxagent.com
```

**The tradeoff, stated honestly:** they asked you to send it and you're
sending them somewhere instead — that costs some replies at peak
interest. What it buys: zero links in the entire flow (deliverability),
and everyone who watches lands on the page where the pricing and the
Polar checkout already are. If the first week shows people replying
"just send it to me", attach the mp4 to the reply instead — a 12 MB
attachment in a thread they started is fine.

### Personalized versions, same rule

One folder per prospect on the same Pages project:
`landing/v/acme-realty/index.html` + `demo.mp4`, copied from the `#demo`
markup. The reply then reads *"getboxagent.com/v/acme-realty"* as plain
text. Only worth doing for prospects who actually reply — don't
pre-build these.

---

## 4. Fallback: the generic version

Record **one** take on `demo.html` (Skyline Realty Group) before Aug 18
using the exact script above. It's the backstop for the reply that lands
at 2am, for a prospect whose site fights the injection, and it's the
rehearsal for the personalized ones. Personalized is the default; generic
is only when personalized isn't possible in the moment.
