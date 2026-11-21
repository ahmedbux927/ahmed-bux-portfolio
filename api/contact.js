// POST /api/contact — portfolio contact form handler (Vercel Serverless Function)
// Flow: validate -> save to Supabase (Postgres, REST) -> send email via Resend.
// No external dependencies; uses Node 18+ global fetch.
// Required env vars (Vercel Project -> Settings -> Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (saving messages)
//   RESEND_API_KEY, CONTACT_TO_EMAIL          (email delivery)
//   CONTACT_FROM_EMAIL (optional, must be on a Resend-verified domain;
//                       defaults to Resend's onboarding sender for tests)
// If an integration is not configured, that step is skipped and reported
// in the response ("stored" / "emailed" flags) instead of failing silently.

function clean(v, max) {
  return String(v == null ? "" : v).trim().slice(0, max);
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

async function saveToSupabase(msg) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(url.replace(/\/$/, "") + "/rest/v1/contact_messages", {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([msg]),
  });
  if (!res.ok) throw new Error("Supabase insert failed: " + res.status);
  return true;
}

async function sendViaResend(msg) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: msg.email,
      subject: "[Portfolio] " + (msg.subject || "New message") + " — " + msg.name,
      text:
        "New message from the portfolio contact form\n\n" +
        "Name: " + msg.name + "\nEmail: " + msg.email + "\nSubject: " + msg.subject +
        "\n\n" + msg.message + "\n",
    }),
  });
  if (!res.ok) throw new Error("Resend send failed: " + res.status);
  return true;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Honeypot: bots fill the hidden "company" field; humans never see it.
  if (clean(body.company, 200)) return res.status(200).json({ ok: true });

  const msg = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    subject: clean(body.subject, 200),
    message: clean(body.message, 5000),
  };
  if (!msg.name || !isEmail(msg.email) || !msg.message) {
    return res.status(400).json({ error: "Please provide your name, a valid email and a message." });
  }

  let stored = false, emailed = false;
  try { stored = await saveToSupabase(msg); } catch (e) { console.error(e.message); }
  try { emailed = await sendViaResend(msg); } catch (e) { console.error(e.message); }

  return res.status(200).json({ ok: true, stored, emailed });
};
