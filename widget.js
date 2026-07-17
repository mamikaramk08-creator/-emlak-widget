/*!
 * Real Estate AI Chat Widget
 * Embed with:
 *   <script>
 *     window.RealEstateWidgetConfig = {
 *       agencyName: "ABC Realty",
 *       primaryColor: "#0B5FFF",
 *       proxyBaseUrl: "https://your-worker.workers.dev"
 *     };
 *   </script>
 *   <script src="https://.../widget.js"></script>
 */
(function () {
  if (window.__realEstateWidgetLoaded) return;
  window.__realEstateWidgetLoaded = true;

  var cfg = window.RealEstateWidgetConfig || {};
  var agencyName = cfg.agencyName || 'our team';
  var agencyBlurb = cfg.agencyBlurb || '';
  var primaryColor = cfg.primaryColor || '#0B5FFF';
  var logoUrl = cfg.logoUrl || '';
  var proxyBaseUrl = (cfg.proxyBaseUrl || '').replace(/\/+$/, '');

  if (!proxyBaseUrl) {
    console.error('[RealEstateWidget] RealEstateWidgetConfig.proxyBaseUrl is required.');
    return;
  }

  // ---------- Styles ----------
  var style = document.createElement('style');
  style.setAttribute('data-rew', 'true');
  style.textContent =
    '.rew-bubble{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;' +
    'background:' + primaryColor + ';box-shadow:0 4px 16px rgba(0,0,0,.2);border:none;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;z-index:2147483000;transition:transform .15s ease;}' +
    '.rew-bubble:hover{transform:scale(1.06);}' +
    '.rew-bubble svg{width:28px;height:28px;fill:#fff;}' +
    '.rew-panel{position:fixed;bottom:92px;right:20px;width:380px;max-width:calc(100vw - 32px);height:600px;' +
    'max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.22);' +
    'display:none;flex-direction:column;overflow:hidden;z-index:2147483000;' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}' +
    '.rew-panel.rew-open{display:flex;}' +
    '.rew-header{background:' + primaryColor + ';color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px;flex-shrink:0;}' +
    '.rew-header-logo{width:32px;height:32px;border-radius:8px;object-fit:cover;background:rgba(255,255,255,.2);}' +
    '.rew-header-text{flex:1;min-width:0;}' +
    '.rew-header-title{font-weight:600;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.rew-header-sub{font-size:12px;opacity:.85;}' +
    '.rew-close{background:transparent;border:none;color:#fff;cursor:pointer;padding:4px;opacity:.85;flex-shrink:0;}' +
    '.rew-close:hover{opacity:1;}' +
    '.rew-close svg{width:20px;height:20px;fill:currentColor;}' +
    '.rew-messages{flex:1;overflow-y:auto;padding:16px;background:#f7f8fa;display:flex;flex-direction:column;gap:10px;}' +
    '.rew-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word;}' +
    '.rew-msg-assistant{background:#fff;color:#1a1a1a;border:1px solid #e7e8ec;border-bottom-left-radius:4px;align-self:flex-start;}' +
    '.rew-msg-user{background:' + primaryColor + ';color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}' +
    '.rew-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#fff;border:1px solid #e7e8ec;border-radius:14px;border-bottom-left-radius:4px;}' +
    '.rew-typing span{width:6px;height:6px;border-radius:50%;background:#b7bac2;animation:rewBlink 1.2s infinite ease-in-out;}' +
    '.rew-typing span:nth-child(2){animation-delay:.2s;}' +
    '.rew-typing span:nth-child(3){animation-delay:.4s;}' +
    '@keyframes rewBlink{0%,80%,100%{opacity:.3;}40%{opacity:1;}}' +
    '.rew-input-row{display:flex;gap:8px;padding:12px;border-top:1px solid #eceef1;background:#fff;flex-shrink:0;}' +
    '.rew-input{flex:1;border:1px solid #dcdfe4;border-radius:20px;padding:10px 14px;font-size:14px;outline:none;resize:none;' +
    'font-family:inherit;max-height:90px;}' +
    '.rew-input:focus{border-color:' + primaryColor + ';}' +
    '.rew-send{background:' + primaryColor + ';border:none;color:#fff;width:40px;height:40px;border-radius:50%;cursor:pointer;' +
    'flex-shrink:0;display:flex;align-items:center;justify-content:center;}' +
    '.rew-send:disabled{opacity:.5;cursor:default;}' +
    '.rew-send svg{width:18px;height:18px;fill:#fff;margin-left:2px;}' +
    '.rew-footer{text-align:center;font-size:10px;color:#b0b3ba;padding:4px 0 8px;background:#fff;flex-shrink:0;}' +
    '@media (max-width:480px){' +
    '.rew-panel{bottom:0;right:0;left:0;top:0;width:100%;max-width:100%;height:100%;max-height:100%;border-radius:0;}' +
    '.rew-bubble{bottom:16px;right:16px;}' +
    '}';
  document.head.appendChild(style);

  // ---------- DOM ----------
  var bubble = document.createElement('button');
  bubble.className = 'rew-bubble';
  bubble.setAttribute('aria-label', 'Open chat');
  bubble.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.02 2 11c0 2.61 1.28 4.94 3.33 6.58L5 22l4.86-2.02c.68.13 1.4.2 2.14.2 5.52 0 10-4.02 10-9S17.52 2 12 2z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'rew-panel';

  var logoHtml = logoUrl
    ? '<img class="rew-header-logo" src="' + escapeAttr(logoUrl) + '" alt="">'
    : '';

  panel.innerHTML =
    '<div class="rew-header">' +
      logoHtml +
      '<div class="rew-header-text">' +
        '<div class="rew-header-title">' + escapeHtml(agencyName) + '</div>' +
        '<div class="rew-header-sub">Typically replies in a few minutes</div>' +
      '</div>' +
      '<button class="rew-close" aria-label="Close chat">' +
        '<svg viewBox="0 0 24 24"><path d="M18.3 5.71L12 12.01l-6.29-6.3-1.42 1.42 6.3 6.29-6.3 6.29 1.42 1.42 6.29-6.3 6.29 6.3 1.42-1.42-6.3-6.29 6.3-6.29z"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="rew-messages" id="rew-messages"></div>' +
    '<div class="rew-input-row">' +
      '<textarea class="rew-input" id="rew-input" rows="1" placeholder="Type your message..."></textarea>' +
      '<button class="rew-send" id="rew-send" aria-label="Send">' +
        '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="rew-footer">Powered by AI &middot; ' + escapeHtml(agencyName) + '</div>';

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector('#rew-messages');
  var inputEl = panel.querySelector('#rew-input');
  var sendBtn = panel.querySelector('#rew-send');
  var closeBtn = panel.querySelector('.rew-close');

  // ---------- State ----------
  var history = []; // {role: 'user'|'assistant', content: string}
  var isOpen = false;
  var isSending = false;
  var leadSent = false;

  // ---------- Helpers ----------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function escapeAttr(str) {
    return escapeHtml(str);
  }
  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function appendMessage(role, text) {
    var div = document.createElement('div');
    div.className = 'rew-msg ' + (role === 'user' ? 'rew-msg-user' : 'rew-msg-assistant');
    div.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
    messagesEl.appendChild(div);
    scrollToBottom();
  }
  function showTyping() {
    var div = document.createElement('div');
    div.className = 'rew-typing';
    div.id = 'rew-typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(div);
    scrollToBottom();
  }
  function hideTyping() {
    var el = document.getElementById('rew-typing-indicator');
    if (el) el.remove();
  }

  var LEAD_MARKER_RE = /<<<LEAD:([\s\S]*?)>>>/;

  function extractLead(reply) {
    var match = reply.match(LEAD_MARKER_RE);
    if (!match) return { cleanReply: reply, lead: null };
    var cleanReply = reply.replace(LEAD_MARKER_RE, '').trim();
    var lead = null;
    try {
      lead = JSON.parse(match[1]);
    } catch (e) {
      lead = null;
    }
    return { cleanReply: cleanReply, lead: lead };
  }

  function sendLead(lead) {
    if (leadSent) return;
    leadSent = true;
    fetch(proxyBaseUrl + '/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agencyName: agencyName,
        sourceUrl: window.location.href,
        name: lead.name || '',
        contact: lead.contact || '',
        role: lead.role || '',
        budget: lead.budget || '',
        location: lead.location || '',
        bedrooms: lead.bedrooms || ''
      })
    }).catch(function () {
      // best-effort; conversation already succeeded for the visitor
    });
  }

  function setSending(sending) {
    isSending = sending;
    sendBtn.disabled = sending;
    inputEl.disabled = sending;
  }

  function sendMessage(text) {
    if (!text.trim() || isSending) return;
    appendMessage('user', text);
    history.push({ role: 'user', content: text });
    inputEl.value = '';
    autoGrow();
    setSending(true);
    showTyping();

    fetch(proxyBaseUrl + '/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: history,
        agencyName: agencyName,
        agencyBlurb: agencyBlurb
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('bad status ' + res.status);
        return res.json();
      })
      .then(function (data) {
        hideTyping();
        var raw = data.reply || '';
        var extracted = extractLead(raw);
        history.push({ role: 'assistant', content: raw });
        if (extracted.cleanReply) {
          appendMessage('assistant', extracted.cleanReply);
        }
        if (extracted.lead) {
          sendLead(extracted.lead);
        }
      })
      .catch(function () {
        hideTyping();
        appendMessage(
          'assistant',
          "Sorry, I'm having trouble connecting right now. Please leave your name and best phone number or email here and " +
            escapeHtml(agencyName) +
            ' will reach out to you directly.'
        );
      })
      .finally(function () {
        setSending(false);
      });
  }

  function autoGrow() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px';
  }

  function openPanel() {
    isOpen = true;
    panel.classList.add('rew-open');
    if (history.length === 0) {
      var greeting =
        "Hi! I'm here to help with your real estate search. Are you looking to buy, sell, or rent?";
      appendMessage('assistant', greeting);
      history.push({ role: 'assistant', content: greeting });
    }
    inputEl.focus();
  }
  function closePanel() {
    isOpen = false;
    panel.classList.remove('rew-open');
  }

  bubble.addEventListener('click', function () {
    isOpen ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  sendBtn.addEventListener('click', function () {
    sendMessage(inputEl.value);
  });
  inputEl.addEventListener('input', autoGrow);
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });
})();
