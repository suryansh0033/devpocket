'use client';
import Link from 'next/link';
import { Terminal, FileText, GitCommit, ArrowRight } from 'lucide-react';

const tools = [
  {
    icon: Terminal,
    name: 'Error Explainer',
    desc: 'Paste any error. Get plain English explanation + fix.',
    path: '/tools/error-explainer',
    tag: 'debugging',
  },
  {
    icon: FileText,
    name: 'README Generator',
    desc: 'Generate a professional README.md in seconds.',
    path: '/tools/readme',
    tag: 'documentation',
  },
  {
    icon: GitCommit,
    name: 'Commit Message AI',
    desc: 'Turn your git diff into 5 perfect commit messages.',
    path: '/tools/commit-msg',
    tag: 'git',
  },
];

export default function Home() {
  return (
    <div style={{ padding: '48px 40px', maxWidth: '860px' }}>
      {/* Hero */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ color: 'var(--accent)', fontSize: '13px', marginBottom: '12px', letterSpacing: '2px' }}>
          &gt;_ DEVELOPER TOOLKIT
        </p>
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '16px' }}>
          The AI workspace<br />
          <span style={{ color: 'var(--accent)' }}>for developers.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '480px', lineHeight: 1.7 }}>
          Free AI tools that fit your workflow. No fluff, no signups — just open and use.
        </p>
      </div>

      {/* Tools Grid */}
      <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>
        AVAILABLE TOOLS
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.path} href={tool.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <Icon size={20} color="var(--accent)" />
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px', letterSpacing: '1px' }}>
                    {tool.tag}
                  </span>
                </div>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                  {tool.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
                  {tool.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '12px' }}>
                  Open tool <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}