/*
 * Paste this into the DevTools console (F12) on a prospect's live
 * homepage. The widget mounts on their page, in your browser, and chats
 * for real through the Cloudflare Worker. Nothing is installed on their
 * server and nothing is sent to them.
 *
 * Edit the three marked lines, paste the whole file, hit Enter.
 * Full recording guide: demo-video-script.md
 */
(function () {
  var AGENCY = "Acme Realty";                    // <-- their company name
  var BLURB  = "a residential real estate agency in Austin, TX"; // <-- theirs
  var COLOR  = "#0B5FFF";                        // <-- their brand hex

  // Already injected once on this page? Reload before trying again —
  // widget.js guards on window.__realEstateWidgetLoaded.
  if (window.__realEstateWidgetLoaded) {
    console.warn("[demo] widget already loaded — reload the page first");
    return;
  }

  window.RealEstateWidgetConfig = {
    agencyName: AGENCY,
    agencyBlurb: BLURB,
    primaryColor: COLOR,
    proxyBaseUrl: "https://realestate-widget-api.mamikaramk08.workers.dev",
    tenantId: "skyline-demo"   // the only tenant the worker knows; the
                               // captured lead emails mamikaramk08@gmail.com
  };

  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/gh/mamikaramk08-creator/-emlak-widget" +
          "@main/widget.js";
  s.onload = function () {
    console.log("[demo] widget mounted — bubble is bottom-right");
  };
  s.onerror = function () {
    console.error(
      "[demo] script blocked. Almost always CSP: DevTools > Network > " +
      "right-click the document request > Override headers > delete " +
      "content-security-policy > reload > paste again."
    );
  };
  document.body.appendChild(s);
})();

/* Optional second paste, once the bubble is visible — opens the panel so
   you don't have to click it on camera:

   document.querySelector('.rew-bubble').click();
*/
