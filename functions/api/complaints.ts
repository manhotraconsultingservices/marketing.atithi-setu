/**
 * POST /api/complaints
 * Saves a user complaint to Cloudflare D1.
 *
 * Bindings required:
 *   DB — D1 database
 */

interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { email, subject, description } = (await request.json()) as Record<string, string>;

    if (!email?.trim()) {
      return Response.json({ error: 'email is required' }, { status: 400 });
    }

    await env.DB.prepare(
      `INSERT INTO complaints (user_email, subject, description) VALUES (?, ?, ?)`
    )
      .bind(email, subject ?? '', description ?? '')
      .run();

    return Response.json({ success: true });
  } catch (err) {
    console.error('[/api/complaints] error:', err);
    return Response.json({ error: 'Failed to save complaint' }, { status: 500 });
  }
};
