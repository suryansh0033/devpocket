'use client';

import Link from 'next/link';
import { Terminal, FileText, GitCommit, GitPullRequest, ArrowRight, Clock } from 'lucide-react';

const sections = [
  {
    category: '🐞 Debug',
    tools: [
      { name: 'Error Explainer', desc: 'Paste any error. Get plain English explanation + fix.', path: '/tools/error-explainer', tag: 'debugging', live: true },
    ],
    coming: ['Docker Error Explainer', 'Stack Trace Explainer'],
  },
  {
    category: '📝 Document',
    tools: [
      { name: 'README Generator', desc: 'Generate a professional README.md in seconds.', path: '/tools/readme', tag: 'documentation', live: true },
    ],
    coming: ['API Docs Generator'],
  },
  {
    category: '🌿 Git',
    tools: [
      { name: 'Commit Message AI', desc: 'Turn your git diff into 5 perfect commit messages.', path: '/tools/commit-msg', tag: 'git', live: true },
      { name: 'PR Description Generator', desc: 'Generate clean, reviewer-ready PR descriptions from a diff.', path: '/tools/pr-description', tag: 'git', live: true },
    ],
    coming: ['Gitignore Generator'],
  },
  {
    category: '🛠 Utilities',
    tools: [],
    coming: ['JSON Formatter', 'JWT Decoder', 'UUID Generator', 'Base64 Encode/Decode'],
  },
];

const icons: Record<string, React.ElementType> = {
  'Error Explainer': Terminal,
  'README Generator': FileText,
  'Commit Message AI': GitCommit,
  'PR Description Generator': GitPullRequest,
};

export default function Home() {
  return (
    <div style={{ padding: '48px 40px', maxWidth: '860px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '52px' }}>
        <p style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '12px', letterSpacing: '2px' }}>
          &gt;_ DEVELOPER TOOLKIT
        </p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px' }}>
          The AI workspace<br />
          <span style={{ color: 'var(--accent)' }}>for developers.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '520px', lineHeight: 1.7 }}>
          Debug errors, generate documentation, and ship code faster. Free developer tools, no sign-up required.
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {sections.map((section) => (
          <div key={section.category}>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '2px', marginBottom: '14px' }}>
              {section.category}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Live tools */}
              {section.tools.map((tool) => {
                const Icon = icons[tool.name] || Terminal;
                return (
                  <Link key={tool.path} href={tool.path} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '20px 24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Icon size={18} color="var(--accent)" />
                        <div>
                          <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{tool.name}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{tool.desc}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} color="var(--accent)" />
                    </div>
                  </Link>
                );
              })}

              {/* Coming soon */}
              {section.coming.map((name) => (
                <div key={name} style={{
                  background: 'var(--bg-secondary)',
                  border: '1px dashed var(--border)',
                  borderRadius: '8px',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0.5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Clock size={16} color="var(--text-muted)" />
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{name}</p>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px', letterSpacing: '1px' }}>COMING SOON</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}