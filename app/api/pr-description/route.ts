import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { input, mode } = await req.json();

  if (!input) {
    return NextResponse.json({ error: 'No input provided' }, { status: 400 });
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
          content: `You are an expert software engineer who writes clear, professional Pull Request descriptions.
Given ${mode === 'diff' ? 'a git diff' : 'a plain-English description of code changes'}, generate a PR description.
Return ONLY a JSON object with this exact shape, nothing else. No explanation, no markdown fences, just the raw JSON object.
{
  "title": "short conventional-commit-style title",
  "whatChanged": ["bullet point 1", "bullet point 2", "bullet point 3"],
  "why": "1-2 sentence explanation of motivation",
  "testingNotes": ["bullet point 1", "bullet point 2"]
}`,
        },
        {
          role: 'user',
          content: `Generate a PR description for this ${mode === 'diff' ? 'diff' : 'change description'}:\n\n${input}`,
        },
      ],
      temperature: 0.5,
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '{}';

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 });
  }
}