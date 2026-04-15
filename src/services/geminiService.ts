export async function chatWithAtithi(message: string, history: { role: string, parts: { text: string }[] }[]) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply as string;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm sorry, I'm having a bit of trouble connecting right now. Please try again later or contact our support team directly.";
  }
}
