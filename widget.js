/*!
 * Real Estate AI Chat Widget — Cloudflare Worker proxy
 *
 * Deploy once (Cloudflare dashboard, paste this file, no OAuth needed).
 * Set these secrets/vars in the Worker's Settings > Variables:
 *   GEMINI_API_KEY   - your Google Gemini API key
 *   RESEND_API_KEY   - your Resend API key
 *
 * Endpoints:
 *   POST /chat  { tenantId, messages, agencyName, agencyBlurb } -> { reply }
 *   POST /lead  { tenantId, agencyName, name, contact, role, budget, location, bedrooms, sourceUrl } -> { ok }
 */

const GEMINI_MODEL = 'gemini-flash-lite-latest';

// Onboarding a new customer = add one line here, then redeploy (paste into Cloudflare dashboard > Deploy).
const TENANTS = {
  'skyline-demo': { notifyEmail: 'mamikaramk08@gmail.com' }
  // 'customer-slug': { notifyEmail: 'customer@example.com' }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, corsHeaders())
  });
}

function buildSystemInstruction(agencyName, agencyBlurb) {
  return (
    'You are a friendly, professional real estate assistant chatting with a website visitor ' +
    'on behalf of "' + agencyName + '"' +
    (agencyBlurb ? (', described as: ' + agencyBlurb) : '') +
    '. Your goals, in natural conversational order, are to find out:\n' +
    '1. Whether the visitor is a buyer, seller, or renter.\n' +
    '2. Their approximate budget.\n' +
    '3. Their preferred neighborhood or area.\n' +
    '4. The number of bedrooms they need (skip this if they are a seller).\n' +
    'Ask ONE question at a time, keep replies short (1-3 sentences), and sound warm and human, ' +
    'not like a form. Once you have their role, budget, and location (and bedrooms if relevant), ' +
    "ask for their name and best phone number or email so the team can follow up, and tell them " +
    "someone from " + agencyName + " will contact them soon.\n" +
    'IMPORTANT: As soon as you have collected a name AND a phone number or email address, append ' +
    'this exact hidden marker at the very end of your reply, on its own, with real values filled in ' +
    'as compact single-line JSON (the visitor will never see this marker, it is stripped automatically):\n' +
    '<<<LEAD:{"name":"...","contact":"...","role":"buyer|seller|renter","budget":"...","location":"...","bedrooms":"..."}>>>\n' +
    'Only include the marker once, in your final closing message, and never mention it to the visitor.'
  );
}

async function handleChat(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const tenantId = (body.tenantId || '').toString().slice(0, 100);
  const tenant = TENANTS[tenantId];
  if (!tenant) {
    return jsonResponse({ error: 'Unknown tenant' }, 403);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const agencyName = (body.agencyName || 'our team').toString().slice(0, 120);
  const agencyBlurb = (body.agencyBlurb || '').toString().slice(0, 500);

  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: 'Server not configured' }, 500);
  }

  const contents = messages
    .filter(function (m) { return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'; })
    .slice(-20)
    .map(function (m) {
      return { role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] };
    });

  const geminiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    GEMINI_MODEL +
    ':generateContent?key=' +
    encodeURIComponent(env.GEMINI_API_KEY);

  const geminiPayload = {
    systemInstruction: {
      parts: [{ text: buildSystemInstruction(agencyName, agencyBlurb) }]
    },
    contents: contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 500, thinkingConfig: { thinkingBudget: 0 } }
  };

  let geminiRes;
  try {
    geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });
  } catch (e) {
    return jsonResponse({ error: 'Upstream request failed' }, 502);
  }

  if (!geminiRes.ok) {
    return jsonResponse({ error: 'Upstream error' }, 502);
  }

  const data = await geminiRes.json();
  const reply =
    (data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text) ||
    "Sorry, I couldn't come up with a reply just now — could you rephrase that?";

  return jsonResponse({ reply: reply });
}

async function handleLead(request, env) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const tenantId = (body.tenantId || '').toString().slice(0, 100);
  const tenant = TENANTS[tenantId];
  if (!tenant) {
    return jsonResponse({ error: 'Unknown tenant' }, 403);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: 'Server not configured' }, 500);
  }

  const agencyName = (body.agencyName || 'Unknown agency').toString().slice(0, 120);
  const name = (body.name || '').toString().slice(0, 200);
  const contact = (body.contact || '').toString().slice(0, 200);
  const role = (body.role || '').toString().slice(0, 50);
  const budget = (body.budget || '').toString().slice(0, 100);
  const location = (body.location || '').toString().slice(0, 200);
  const bedrooms = (body.bedrooms || '').toString().slice(0, 50);
  const sourceUrl = (body.sourceUrl || '').toString().slice(0, 500);

  const escapeHtml = function (s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const html =
    '<h2>New lead from ' + escapeHtml(agencyName) + '</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    '<tr><td><b>Name</b></td><td>' + escapeHtml(name) + '</td></tr>' +
    '<tr><td><b>Contact</b></td><td>' + escapeHtml(contact) + '</td></tr>' +
    '<tr><td><b>Role</b></td><td>' + escapeHtml(role) + '</td></tr>' +
    '<tr><td><b>Budget</b></td><td>' + escapeHtml(budget) + '</td></tr>' +
    '<tr><td><b>Location</b></td><td>' + escapeHtml(location) + '</td></tr>' +
    '<tr><td><b>Bedrooms</b></td><td>' + escapeHtml(bedrooms) + '</td></tr>' +
    '<tr><td><b>Source page</b></td><td>' + escapeHtml(sourceUrl) + '</td></tr>' +
    '</table>';

  let resendRes;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: tenant.notifyEmail,
        subject: 'New real estate lead — ' + agencyName,
        html: html
      })
    });
  } catch (e) {
    return jsonResponse({ error: 'Email send failed' }, 502);
  }

  if (!resendRes.ok) {
    return jsonResponse({ error: 'Email send failed' }, 502);
  }

  return jsonResponse({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method === 'POST' && url.pathname === '/chat') {
      return handleChat(request, env);
    }

    if (request.method === 'POST' && url.pathname === '/lead') {
      return handleLead(request, env);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  }
};
