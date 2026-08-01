# US Plan — Ağustos 2026

**Ana karar: n8n emlak email ajanı ile bu widget tek ürün olarak
satılacak.** İkisi de aynı alıcıya (ABD emlak ofisi) gidiyor:

- Widget → siteye gelen ziyaretçiyi yakalar
- n8n ajanı → gelen emaili karşılar, sınıflandırır, taslak yanıt yazar

Ayrı iki kampanya açmak, aynı kişinin gelen kutusunda kendinle yarışmak
demek. Tek teklif, tek kampanya, tek domain.

Bu birleştirme aynı zamanda n8n hattının TR'de satılamama problemini de
çözüyor (`n8n projesi\ANALIZ-2026-07-19.md`): TR'de Arveya 600 TL/ay'a
daha fazlasını veriyor, ama ABD'de karşılaştırma Follow Up Boss $58/
kullanıcı/ay, Structurely $179-499/ay, Ylopo $295/ay. Aynı ürün, 10-20 kat
fiyat.

---

## Takvim

| Tarih | İş |
|---|---|
| 28 Tem | Marka domaini (`getboxagent.com`) alındı + Email Routing kuruldu. Outreach domainleri (`inboxagentapps.com`/`tryinboxagent.com`) + Instantly bağlantısı + SPF/DKIM/DMARC + warm-up **henüz yapılmadı** — sıradaki adım bu. |
| 29 Tem – 8 Ağu | Aşağıdaki hazırlık (akşamları — gündüz saha hattı çalışıyor) |
| **11 Ağu** | Kampanya açılır, 90 mail/gün, 4 günde 300 liste biter |
| 15 Ağu | Ders başlıyor; kampanya email üzerinden kendi kendine döner |

Warm-up 2 hafta sürüyor ve kısaltılamıyor. O yüzden bu hat arka planda
ısınırken asıl mesai TR saha hattına gidiyor —
`Desktop\araştırma\plan-28temmuz-15agustos.md`.

---

## Hazırlık listesi (11 Ağustos'a kadar)

### Ürün
- [ ] Birleşik teklifin tek cümlesi: *"Your website visitors and your
      inbox — both answered automatically, leads sorted and sent to you."*
- [ ] n8n ajanını widget ile aynı tenant yapısına bağla (`TENANTS`)
- [ ] **Resend sandbox blokerini çöz** — gönderim domaini doğrulanmadan
      gerçek müşteri onboard edilemez (README'de yazılı)
- [ ] Gemini free tier'dan çık (paralı katman, ABD müşterisi için SLA)
- [ ] **`getboxagent.com` üzerinde landing page — 11 Ağustos'tan önce.**
      Kozmetik değil, doğrudan dönüşüm blokeri: *"Mailinize cevap vermeden
      önce müşteri ilk web sitenize girecek. Web sitenizin kötü olması
      dönüş oranlarınızı otomatik olarak azaltır."* (Burhan Kocabıyık)
      İçerik: tek cümlede ne yaptığın → alt açıklamalar → CTA "book a
      call" → güven rakamları → sektöre özel kullanım örnekleri.

### Domain (29 Temmuz'da alınacak) — 28.07 akşamı revize edildi
- [x] **`getboxagent.com`** — marka domaini. `inboxagent.com`/
      `getinboxagent.com` alınmıştı; RDAP taramasıyla bulunan müsait isim
      bu oldu (detay: `getboxagent-domain-kurulumu` hafıza dosyası).
      Cloudflare Registrar'da Active. **Email Routing kuruldu:** Enabled,
      MX+SPF kilitli, catch-all → mamikaramk08@gmail.com. Marka sitesi,
      Resend domain doğrulaması ve Polar hesabı bunun üstüne kurulacak —
      **site hâlâ yok**, sadece DNS/email hazır.
- [ ] **Outreach (gönderim) domaini** — `inboxagentapps.com` /
      `tryinboxagent.com`. Ayrı tutulacak ki yanarsa marka domaini
      etkilenmesin, marka sitesine yönlendirilecek. **Henüz kurulmadı** —
      Instantly bağlantısı, gönderim SPF/DKIM/DMARC ve warm-up bu ikisi
      üzerinde yapılacak asıl bekleyen iş.
- [x] Cloudflare Registrar tercih edildi (markup yapmıyor, DNS zaten
      orada). Üç domain de `.com`.

*Elenen isim: `nevermisslead.com` — alınmış ve doğrudan rakip (aşağıya
bak). Ayrıca gönderen adresi olarak slogan gibi durup güven düşürüyordu.*

### Rakip: NeverMissLead
`https://www.nevermisslead.com` — yerel hizmet işletmelerine lead yakalama
platformu. **$149,99/ay + kurulum ücreti.**

İlk fiyat kararında referans alınmıştı ama 28.07.2026'da fiyat $399/ay'a
çıktı ve kurulum ücreti kaldırıldı — NeverMissLead'in bandı artık bizim
fiyatımızın altında kalıyor, o daha ucuz/dar (sadece lead yakalama) bir
ürün. Konumlandırma karşılaştırması için hâlâ geçerli referans.

### Ödeme — bunsuz satış tahsil edilemez
- [x] **Polar.sh hesabı açıldı** (31.07). Stripe ve PayPal Türkiye'de
      kayıtlı işletmeden ödeme kabul etmiyor. Polar Türkiye'yi açıkça
      destekliyor, Stripe Connect Express ile payout yapıyor.
      Detay: `Desktop\araştırma\abd-avrupa-satis-odeme-vergi.md`
- [ ] Fiyatlandırma: **$399/ay + $0 kurulum + 3 ay minimum taahhüt**
      (güncellendi 28.07.2026 — AI-otomasyon-ajansı pratikçi araştırması
      sonrası). Kurulum ücreti kaldırıldı: `inboxagent` productized bir
      sistem (aynı workflow her müşteriye kopyalanıyor), kurulum ücreti
      "özel emek" izlenimi verip kuga.ai'nin tarif ettiği "hamster wheel"
      itirazını (müşteri "neye ücret ödüyorum" der) davet ediyordu.
      Detay: [[kurulum-ucreti-araştirmasi-2026-07]] (proje hafızası).
      - İmza anında kart bilgisi alınır, **ilk ay ($399) hemen çekilir** —
        kurulum ücretinin yaptığı "ciddiyetsiz müşteriyi ele" işini bu
        görüyor.
      - Sözleşmede 3 ay minimum madde: erken iptalde kalan ayların bedeli
        fatura edilir. Ama asıl koruma bu madde değil — n8n workflow ve
        widget kendi altyapımızda barınıyor, ödeme kesilirse erişim/
        entegrasyon anında durdurulur (kill-switch).
      - Aylık otomatik kart tahsilatı (Stripe/Polar) — iptal etmek için
        müşteri harekete geçmeli, biz peşine düşmüyoruz.
      - 3 ayı peşin ödeyene **%10 indirim** ($1.197 → ~$1.077) — gerçek
        nakit + gerçek taahhüt bir arada.
      - Alt paket gerekirse $129/ay (sadece widget).

### Outreach — 28.07.2026'da revize edildi

YouTube araştırmasından çıkan düzeltmeler:
`Desktop\araştırma\youtube-outreach-arastirmasi-2026-07-28.md`

- [ ] Listeyi Apify Lead Finder / Leadmesh'ten çek (Apollo değil —
      **300 değil, 1.000-2.000 kontak.** Bu en önemli düzeltme. Burhan'ın
      en kötü segmenti %0,8 yanıt almış; 300 mailde bu 2,4 yanıt eder.
      n=300'de sonuç değil gürültü ölçüyorsun. Filtreler
      `apollo-filters.md`'de hazır (Apify'a da uygulanabilir).
- [ ] **Tek/iki eyalete bağımlı kalma — ilk partiyi 4 eyalete böl:**
      Texas + Florida (mevcut, en büyük havuz) + Georgia + North Carolina
      (orta-büyük havuz, daha düşük vendor-spotlight riski). Her lead'e
      **State** etiketi (TX/FL/GA/NC) koy ve Instantly/Sheets'e bu etiketle
      taşı — gerekçe ve eyalet-bazlı ölçüm planı `apollo-filters.md`'de.
- [ ] **Segmentasyonu gözlemlenebilir bir eksiğe bağla:** sitesinde chat /
      lead yakalama **olmayan** ofisleri ayıkla — ilk parti için bu artık
      opsiyonel değil, **zorunlu** ilk-eleme kriteri (bkz.
      `apollo-filters.md`). Burhan'ın kliniklerde iyi sonuç almasının
      sebebi buydu (web sitesi olmayanları seçmesi); "genel KOBİ" listesi
      %0,8'de kalmıştı.
- [ ] `email-sequence.md`'yi **4 dokunuşa çıkar** (şu an 2). Gün 0 / 2-3 /
      5-7 / 10-14. Takiplerden yanıtların %42'si geliyor. Burhan'ın bir
      kampanyasında mail 1 = %2, mail 2 = %4,5 — aynı şeyi doğruluyor.
- [ ] **CTA'yı toplantıdan videoya çevir.** "Book a call" yerine:
      *"I put together a short video showing [X]. Want me to send it?"*
      Yanıt gelince sadece video linkini at — takvim/görüşme linki yok,
      kapanış checkout üzerinden async ilerliyor.
      Sürtünme düşüyor ve demo öne geçiyor. (Aaron Shepherd, 4,5M mail)
- [ ] **CAN-SPAM uyumu:** her maile geçerli fiziksel posta adresi +
      çalışan opt-out linki. Şu an ikisi de yok. Ceza mail başına
      $51.744'e kadar — kampanya başına değil.
- [ ] Mailbox sayısını **3'ten 6-9'a çıkar** (2-3 gönderim domaini).
      Hacim mailbox başına hızdan değil **mailbox sayısından** geliyor —
      Burhan 15 mailbox'la ayda 30.000 mail atıyor, mailbox başına
      haftada sadece 85 mail.
- [ ] Gönderim tavanı **30/mailbox/gün** (Burhan 12'de çalışıyor; ilk
      kampanyada 15-20'den başla, sorun çıkmazsa yükselt)
- [ ] Mailler arası bekleme **20 dakika** (Instantly varsayılanı 8)
- [ ] Gönderim saati 08:00-16:00 (alıcının saat dilimi)
- [ ] Bounce %2'yi geçerse dur, listeyi temizle
- [ ] **Yanıt süresi kuralı: 5 dakika.** Gelen yanıta 5 dakika içinde dön.
      Takip metriği açılma değil **yanıt oranı**; %5 altı = tehlike.
- [ ] **Instantly'de açılma/tıklama takibini kapat.** Varsayılan açık ve her
      ikisi de maile piksel/link wrapper ekliyor — Gmail/Outlook bunu
      promosyon sinyali sayıp spam'e atma ihtimalini artırıyor. (28.07
      üçüncü video bulgusu, `youtube-outreach-arastirmasi-2026-07-28.md` §10)
- [ ] **İlk 1-2 dokunuşta hiç link kullanma, şirket adı da dahil.** Marka adı
      geçsin ama düz metin, hyperlink olarak biçimlenmesin. Video linki
      sadece müşteri "gönder" der/yanıt verirse gidecek maile konur — bu,
      Aaron Shepherd'ın "linki yanıt sonrası gönder" kuralıyla zaten
      uyumlu, sadece şirket adına da genişletiliyor.
- [ ] **Lead kaynağı: Apollo değil, Apify Lead Finder (~$2/1000 lead).**
      Burhan'ın kendisi de Apollo'yu pahalı bulup kullanmıyor — 7-10 kat
      ucuz olan Apify/Leadmesh'i kullanıyor. 11 Ağustos listesini
      Apify'dan çek; ilk küçük örnekte verified-email oranını kontrol et,
      düşük çıkarsa filtreyi sıkılaştır.

---

## Beklenti — 28.07.2026'da revize edildi

**Eski:** 300 mail → 6-11 yanıt → 2-4 konuşma → 0-2 pilot.
Bu liste boyutu yanlıştı; %0,8'lik bir segment denk gelirse 300 mail hiçbir
şey söylemiyor.

**Yeni:** 1.500 mail → %3-5 yanıt = 45-75 yanıt → yarısı olumsuz
(Burhan'ın kendi uyarısı) = **20-35 olumlu** → %20 kapanma → **4-7 pilot**.

Bu iyimser tarafı. Kötü senaryo tek bir sayıya bağlı: liste kalitesi.
Aynı huni %0,8 yanıtla çalışırsa 12 yanıt, 6 olumlu, 1 pilot.

**Eyalet-bazlı ölçüm (2026-08-01 eklendi):** İlk 300-400 gönderimden sonra
(4 eyalet — TX/FL/GA/NC — dengeli dağıtıldığında) reply-rate'i eyalet
bazında karşılaştır. Herhangi bir eyalet %1 altına düşerse o eyaletin
gönderimini durdur, diğerlerine devam et. Hepsi %3-5 bandında kümeleniyorsa,
"TX/FL'e özel doygunluk" teorisi çürütülmüş sayılır ve sonraki partilerde
TX/FL ağırlıklı gidilebilir. Detay/gerekçe: `apollo-filters.md`.

$399/ay fiyatla 4 müşteri = $1.596/ay + $0 kurulum. Hizmet
ihracı istisnası 1/1/2026'dan itibaren %100 — yurt dışı kazanç gelir
vergisinden tam istisna olabiliyor, ihracatta KDV %0.

Asıl değer ilk müşteride değil, ABD'de referansı olan bir ürüne sahip
olmakta.
