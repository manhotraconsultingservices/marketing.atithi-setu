/**
 * POST /api/leads
 * Saves a lead to Cloudflare D1 and sends an email notification via Resend.
 *
 * Bindings required (set in Cloudflare Pages → Settings → Functions):
 *   DB                 — D1 database
 *   RESEND_API_KEY     — Resend.com API key (optional — skips email if absent)
 *   NOTIFICATION_EMAIL — Where to send lead alerts
 */

interface Env {
  DB: D1Database;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

/** Prevent XSS in email HTML */
function esc(s: string | undefined | null): string {
  return (s ?? 'N/A')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Record<string, string>;
    const { name, email, phone, state, city, restaurantName, message } = body;

    if (!name?.trim() || !email?.trim()) {
      return Response.json({ error: 'name and email are required' }, { status: 400 });
    }

    /* ── 1. Save to D1 ─────────────────────────────────────────── */
    await env.DB.prepare(
      `INSERT INTO leads (name, email, phone, state, city, restaurant_name, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(name, email, phone ?? '', state ?? '', city ?? '', restaurantName ?? '', message ?? '')
      .run();

    /* ── 2. Email notification via Resend ───────────────────────── */
    if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AtithiSetu Leads <contact@atithi-setu.com>',
          to: [env.NOTIFICATION_EMAIL],
          subject: `New Lead: ${esc(name)} — ${esc(city)}, ${esc(state)}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#F3EAD8;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#FAF5EE;border-radius:16px;overflow:hidden;border:1px solid #E8DDD0;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#E8721C,#C9952A);padding:24px 28px;">
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:11px;text-transform:uppercase;letter-spacing:2px;font-family:monospace;">AtithiSetu ERP</p>
      <h2 style="margin:6px 0 0;color:#fff;font-size:20px;">New Lead Received 🎉</h2>
    </div>
    <!-- Body -->
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ['Name',     esc(name)],
          ['Email',    esc(email)],
          ['Phone',    esc(phone)],
          ['Location', `${esc(city)}, ${esc(state)}`],
          ['Business', esc(restaurantName)],
          ['Message',  esc(message) || 'No message provided'],
        ].map(([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #E8DDD0;color:#7A6A58;font-size:13px;width:130px;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E8DDD0;color:#100C08;font-weight:bold;font-size:14px;">${value}</td>
        </tr>`).join('')}
      </table>
      <div style="margin-top:24px;padding:12px 16px;background:#FBF0DC;border-radius:8px;border-left:3px solid #E8721C;">
        <p style="margin:0;font-size:12px;color:#7A6A58;">Received <strong>${timestamp} IST</strong> via atithi-setu.com</p>
      </div>
    </div>
  </div>
</body>
</html>`,
        }),
      });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('[/api/leads] error:', err);
    return Response.json({ error: 'Failed to save lead' }, { status: 500 });
  }
};
