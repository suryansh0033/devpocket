import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { diff } = await req.json();

  if (!diff) {
    return NextResponse.json({ error: 'No diff provided' }, { status: 400 });
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
          content: `You are an expert at writing git commit messages following the Conventional Commits specification.
Generate exactly 5 different commit messages for the given git diff.
Each message should start with a type like feat:, fix:, refactor:, chore:, docs:, style:, test: etc.
Return ONLY a JSON array of 5 strings, nothing else. No explanation, no markdown, just the raw JSON array.
Example: ["feat: add user authentication", "fix: resolve login redirect issue", ...]`,
        },
        {
          role: 'user',
          content: `Generate 5 conventional commit messages for this diff:\n\n${diff}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '[]';

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    const messages = JSON.parse(clean);
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: 'Failed to parse response' }, { status: 500 });
  }
}