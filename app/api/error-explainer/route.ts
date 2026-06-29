import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { error, language } = await req.json();

  if (!error) {
    return NextResponse.json({ error: 'No error provided' }, { status: 400 });
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `You are an expert developer who explains errors in plain English.
Given an error message, respond ONLY with a JSON object with exactly these 3 keys:
- "explanation": what the error means in simple terms
- "cause": the most likely reason it happened
- "fix": how to fix it, with a code example if relevant
No markdown, no extra text, just raw JSON.`,
        },
        {
          role: 'user',
          content: `${language ? `Language/Framework: ${language}\n` : ''}Error:\n${error}`,
        },
      ],
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '{}';

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 });
  }
}