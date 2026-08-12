# Yanıt Playbook'u — Batch 1 (18 Ağustos'tan itibaren)

> Kampanya 18.08'de gönderime başlıyor (821 lead, 4 adım). Bu dosya
> **yanıt geldikten sonrasını** kapsar. Videoyu taşıyan ilk cevap
> `demo-video-script.md` §3'te duruyor — burada tekrarlanmadı, oradan
> kopyala. Buradaki her İngilizce blok olduğu gibi yapıştırılabilir;
> `{FirstName}` / `{Company}` elle doldurulur (Instantly değişkenleri
> sadece otomatik sekansta çalışır, elle yanıtta değil).

---

## 0. Bildirim — bunsuz 5 dakika kuralı çalışmaz

Yanıtlar Instantly'nin Unibox'ına **ve** gönderen kutunun kendi inbox'ına
düşer. Telefona 6 ayrı `tryinboxagent.com` hesabı kurmak yerine tek ayar:
Instantly → Settings → Notifications → yeni yanıtta e-posta bildirimi →
`mamikaramk08@gmail.com` (telefonda zaten push atıyor).

Gönderim penceresi 08:00-16:00 Central = **TR saatiyle 16:00-24:00**.
Yanıtların çoğu bu bandın içinde ve hemen sonrasında gelir; sabah
uyandığında 8 saatlik yanıt birikmiş olmaz. 5 dakika kuralı akşam
saatlerinde geçerli, gece 03:00'te değil.

**Beklenen hacim:** ~670 gönderilebilir lead, %3-6 yanıt = toplam
**20-40 yanıt**, günde 1-3. Panik yapılacak bir yığın gelmiyor; her
yanıta elle ve düzgün cevap verilebilir.

---

## 1. Yanıt tipleri ve ne gider

### A. "Send it" / "Sure" / "Yes please" — asıl hedef
`demo-video-script.md` §3'teki metin gider. Kişiselleştirilmiş video
varsa o, yoksa generic (Skyline) sürüm. **Bekletme** — 5 dakika kuralı
esas olarak bu kategori için var.

### B. Video sonrası "looks good / how much?" — paraya en yakın an
```
Hi {FirstName},

Glad it landed. Two ways to run it:

- Website widget only — $149/month
- Widget + inbox triage (it also drafts replies to leads who email
  you) — $399/month

Both are $0 setup, 7-day free trial, cancel inside the trial and you
won't be charged. Most offices start with the widget alone.

Here's the link — once you're through it I'll have the widget live on
{Company}'s site the same day:
https://buy.polar.sh/polar_cl_y4LuqhHBYCCEuDQbd1rRLPvOLwDsXAWlGcZ861A2M0E

Muhammet Karakaş
InboxAgent | getboxagent.com
```
Fiyatı **sen söyle**, "landing sayfasına bak" deme — yanıt veren kişi
zaten ilgili, sürtünme ekleme.

### C. "What's the price?" (videoyu istemeden) — önce video
```
Hi {FirstName},

$149/month for the website widget, $399 if you also want the inbox
side. $0 setup, 7-day free trial.

Before that though — here's the 75-second video so you can see exactly
what it does on {Company}'s site: {video link}

Muhammet Karakaş
InboxAgent | getboxagent.com
```

### D. "Who are you / where are you based?" — dürüst cevap
```
Hi {FirstName},

Fair question — I'm an independent developer based in Turkey, and
InboxAgent is my product. Everything is run remotely: I install the
widget on your site, you get the leads by email, and there's nothing
for you to maintain.

That's also why there's no setup fee and a 7-day trial — you shouldn't
have to take my word for it.
```
Konumu saklama. Bir kez yalan söylenirse kart bilgisi isteyen bir
teklifte güven tamamen biter.

### E. "Not interested" / "Remove me" — tek satır, tartışma yok
Instantly'de lead'i **unsubscribe** işaretle (opt-out listesine girer,
batch 2'de tekrar mail gitmez). Cevap yazma. "Remove me" agresif geldiyse
kısa bir `Removed — sorry for the interruption.` yeterli.

### F. "Send me info / do you have a deck?" — video zaten o
```
Hi {FirstName},

No deck — the video is the whole thing: {video link}

75 seconds, and it's your own site in it. If anything's unclear after
that, just ask me here.
```

### G. "Can we hop on a call?" — istisna, kural değil
Async kapanış tercih ediliyor ([[kapanis-modeli-async-tercih]]), ama
**parasını ödemeye hazır biri görüşme isterse görüşme yapılır.** Önce
async'e bir kez çevir:
```
Hi {FirstName},

Happy to — though the video probably answers most of it in 75 seconds,
and you can start the trial without talking to anyone: https://buy.polar.sh/polar_cl_y4LuqhHBYCCEuDQbd1rRLPvOLwDsXAWlGcZ861A2M0E

If you'd still rather talk it through, send me a couple of times that
work for you this week and I'll make one of them work.
```
Israr ederse kabul et. Saat farkı: TR = Central + 8. Onların 09:00-11:00
bandı sende 17:00-19:00, en rahat pencere bu.

### H. Otomatik yanıtlar (OOO, "no longer with the company")
Instantly stop-on-auto-reply açık, sekans zaten duruyor. OOO ise dönüş
tarihini not al, elle tek bir takip at. "No longer here" ise lead'i
kapat — yeni kişiyi aramak batch 1'in işi değil.

### I. Öfkeli / "this is spam"
Cevap verme, unsubscribe işaretle. Tek istisna, şikayet tehdidi varsa:
```
Removed from all lists — you won't hear from me again. Apologies.
```
Savunma yapma, CAN-SPAM adresini hatırlatma, hiçbir şey satma.

---

## 2. Ödeme → kurulum (ilk müşteri geldiğinde)

Polar'dan "yeni abonelik" maili düştüğü an:

1. **Hoş geldin maili** (aynı gün, ideal olarak 1 saat içinde):
```
Hi {FirstName},

You're in. Two quick things and I'll have this live today:

1. Which email address should new leads go to?
2. Do you (or whoever manages the site) have access to add one line of
   code before </body>? If it's WordPress/Squarespace/Wix I can tell you
   exactly where to paste it, it takes about two minutes.

Muhammet Karakaş
InboxAgent | getboxagent.com
```
2. `worker.js` → `TENANTS`'a tek satır ekle
   (`'acme-realty': { notifyEmail: 'leads@acmerealty.com' }`), Cloudflare
   dashboard'a yapıştır → **Deploy**. Bilinmeyen tenantId 403 alır,
   yani bu adım atlanırsa widget hiç çalışmaz.
3. Embed snippet'ini müşteriye gönder (`README.md` §3):
   `agencyName`, `primaryColor` (sitelerinin ana rengi), `proxyBaseUrl`,
   `tenantId`.
4. **Kendin doğrula:** snippet takıldıktan sonra siteye gir, sohbeti
   sonuna kadar götür, lead maili müşterinin adresine **gerçekten**
   ulaşmış mı bak. Resend domaini (`notify.getboxagent.com`) doğrulanmış
   durumda, ama teslim sayılması için o mailin geldiğini görmek gerek.
5. 48 saat sonra tek satır takip: `Any chats come through yet?` — 7
   günlük deneme bitmeden en az bir gerçek lead görmeleri gerekiyor,
   yoksa iptal ederler.

---

## 3. Bilinen boşluklar — bunlar yanıt gelmeden kapanmalı

**a) $149 checkout linki — ÇÖZÜLDÜ (12.08).** Polar'da
`getboxagent — AI Chat Widget` ürünü açıldı ($149/ay, 7 gün ücretsiz
deneme, public), checkout linki (label `Landing page - Widget only`)
yukarıdaki B/C/G bloklarına yerleştirildi. Test edildi: checkout
sayfası "7 days free · then $149/month" gösteriyor.
`landing/index.html`'deki Website Widget butonu da bu linke bağlandı,
**deploy edilmedi**. Inbox Triage ($299) bilerek `mailto:` bırakıldı —
(b)'deki sebep.

**a2) POLAR HESABI TEST MODUNDA — gerçek para tahsil edilemiyor.**
Checkout sayfasında *"Muhammet Karakaşw is in test mode. You can test
checkout with free products or 100% discount orders."* yazıyor.
`/finance/account` → **Account Review hiç gönderilmemiş.** Eksikler:
kimlik doğrulama (foto ID, ~5 dk), payout hesabı ("additional
information required"), ne sattığının açıklaması, ürün web sitesi,
destek e-postası → sonra "Submit for review".
Bu **$399 linkini de** kapsıyor; yani landing'de aylardır duran buton
da bugün para alamaz. İnceleme onayı zaman alıyor, 18 Ağustos'a 6 gün
kaldı. **Sıradaki en yüksek öncelik bu** — yanıt gelip müşteri ödemeye
kalktığında ödeyemezse huni orada biter.

**b) Inbox Triage yarısı ABD'ye hazır değil.** n8n workflow'u
(`gzO1myWwKVrOTajB`) tek kiracılı: tek Gmail OAuth credential'ı, Türkçe
promptlar, "Portföy" sekmesi. Bir ABD müşterisine bağlamak kendi
Gmail'lerine OAuth izni + workflow kopyası + İngilizce promptlar
demek — hiç yapılmadı. Yani **tek self-serve checkout linki, en hazır
olmayan katmana bağlı.**
**Karar:** varsayılan olarak yanıtları $149'a yönlendir (link artık
var). $399 isteyen çıkarsa inbox tarafını elle/beyaz eldiven kur ve
ilk müşteride 1-2 gün ekstra iş olacağını kabul et.

**c) Güvenlik denetimi yapılmadı** — çok kiracılı yapıda tenant
izolasyonu hiç test edilmedi. İlk müşteri gerçek ABD lead'i tutacak.
Ayrı iş kalemi, playbook'un konusu değil ama ilk ödemeden önce bitmeli.
