/**
 * POST /api/chat
 * Proxies messages to Google Gemini and returns the AI response.
 * Uses the REST API directly — no SDK needed in Workers runtime.
 *
 * Bindings required:
 *   GEMINI_API_KEY — Google AI Studio API key
 */

interface Env {
  GEMINI_API_KEY: string;
}

interface ContentPart {
  text: string;
}
interface Content {
  role: 'user' | 'model';
  parts: ContentPart[];
}

const SYSTEM_INSTRUCTION = `
You are "AtithiSetu BOT", the AI assistant for AtithiSetu ERP.
AtithiSetu is a SaaS ERP for Hospitality businesses (Restaurants, Hotels, Bars, Spas, Event Venues).

Your goals:
1. **Onboarding**: Help business owners understand how to get started. Explain the steps: Register → Build Menu → Set up Tables → Onboard Team → Go Live.
2. **Lead Generation**: If they show interest, ask for their name, restaurant/business name, and email. Tell them a representative will contact them.
3. **Support/Complaints**: If they have a complaint, ask for their email and a description of the issue.

Key Industry Knowledge:
- **Restaurants & Fine Dining**: Focus on timing, real-time menu updates (remove Wagyu ribeye instantly if out), QR scanners to reduce "waiter-hunting", and staff upsell tracking.
- **Hotels & Resorts**: Concierge in pocket, bedside QR for room service, housekeeping sync to turn rooms faster.
- **Bars & Nightclubs**: QR ordering from crowded booths, staff focus on crafting drinks instead of navigating noisy crowds.
- **Cafes & Bakeries**: QR Pre-order & Pick-up for 25% faster throughput during morning rushes.
- **Food Trucks**: Digital menus to save space and lower printing costs.
- **Event Venues**: Mobile ordering for seats to reduce concourse congestion.

Core Advantages:
- **For Customers**: Visual appeal (high-res photos), safety/hygiene (contactless), language accessibility (one-click translation).
- **For Business**: Dynamic pricing (Happy Hour), staff retention (less grunt work), data insights (popular items/times).

Philosophy: "The transition to digital menus isn't just an IT upgrade; it's a hospitality upgrade. It frees your staff to be hosts, not just order-takers."

Tone: Professional, hospitable, helpful, and efficient. Use Indian hospitality context where appropriate (e.g., "Atithi Devo Bhava").
Keep responses concise — 2–4 sentences unless the user asks for detail.
`.trim();

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { message, history } = (await request.json()) as {
      message: string;
      history?: Content[];
    };

    if (!message?.trim()) {
      return Response.json({ error: 'message is required' }, { status: 400 });
    }

    if (!env.GEMINI_API_KEY) {
      return Response.json({ error: 'AI service not configured' }, { status: 500 });
    }

    const contents: Content[] = [
      ...(history ?? []),
      { role: 'user', parts: [{ text: message }] },
    ];

    const geminiRes = await fetch(`${GEMINI_URL}?key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[/api/chat] Gemini error:', geminiRes.status, errText);
      return Response.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    const data = (await geminiRes.json()) as {
      candidates?: { content: { parts: { text: string }[] } }[];
    };

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return Response.json({ reply });
  } catch (err) {
    console.error('[/api/chat] error:', err);
    return Response.json({ error: 'AI service unavailable' }, { status: 500 });
  }
};
