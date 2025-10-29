import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  topic: z.string().min(2),
  message: z.string().min(10, "Please include more detail")
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString()
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn("Failed to send webhook", error);
    }
  }

  return NextResponse.json({ ok: true });
}
