import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { projectName, description, techStack, features, installation, usage } = await req.json();

  if (!projectName || !description) {
    return NextResponse.json({ error: 'Project name and description are required' }, { status: 400 });
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
          content: `You are an expert at writing professional GitHub README files in Markdown.
Generate a clean, well-structured README.md based on the details provided.
Include sections like: title, description, features, tech stack, installation, usage, and license.
Return ONLY the raw markdown, no explanation, no backticks wrapping it.`,
        },
        {
          role: 'user',
          content: `Project Name: ${projectName}
Description: ${description}
Tech Stack: ${techStack || 'Not specified'}
Features: ${features || 'Not specified'}
Installation: ${installation || 'Not specified'}
Usage: ${usage || 'Not specified'}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const readme = data.choices?.[0]?.message?.content || '';

  return NextResponse.json({ readme });
}