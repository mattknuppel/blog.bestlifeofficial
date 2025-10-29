import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Please provide your name.'),
  email: z.string().email('Please provide a valid email.'),
  topic: z.enum(['general', 'partnerships', 'press']),
  message: z.string().min(20, 'Please share a bit more detail.'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse({
      ...body,
      topic: String(body.topic || '').toLowerCase(),
    });

    const payload = {
      submittedAt: new Date().toISOString(),
      ...data,
    };

    if (process.env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        console.error('Contact webhook error', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        return NextResponse.json(
          {
            success: false,
            message: 'We could not send your message right now. Please try again later.',
          },
          { status: 502 },
        );
      }
    } else {
      console.info('Contact submission', payload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.flatten() }, { status: 400 });
    }
    console.error('Contact submission error', error);
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}
