'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitPullRequest, Copy, Check, Loader2, ArrowLeft } from 'lucide-react';

type Mode = 'diff' | 'plain';

interface PRResult {
  title: string;
  whatChanged: string[];
  why: string;
  testingNotes: string[];
}

export default function PrDescription() {
  const [mode, setMode] = useState<Mode>('diff');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<PRResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/pr-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, mode }),
      });
      const data = await res.json();
      if (data.result) setResult(data.result);
      else setError('Failed to generate. Try again.');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatForCopy = (r: PRResult) => {
    return `## ${r.title}

### What Changed
${r.whatChanged.map(item => `- ${item}`).join('\n')}

### Why
${r.why}

### Testing Notes
${r.testingNotes.map(item => `- ${item}`).join('\n')}`;
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(formatForCopy(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '48px 40px', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none', marginBottom: '16px', width: 'fit-content' }}>
          <ArrowLeft size={14} /> Back to home
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <GitPullRequest size={20} color="var(--accent)" />
          <p style={{ color: 'var(--accent)', fontSize: '13px', letterSpacing: '2px' }}>GIT TOOL</p>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          PR Description Generator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Paste a git diff or describe your changes → get a clean, reviewer-ready PR description.
        </p>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setMode('diff')}
          style={{
            background: mode === 'diff' ? 'var(--accent-dim)' : 'var(--bg-secondary)',
            color: mode === 'diff' ? 'var(--accent)' : 'var(--text-muted)',
            border: mode === 'diff' ? '1px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
          }}
        >
          Paste Git Diff
        </button>
        <button
          onClick={() => setMode('plain')}
          style={{
            background: mode === 'plain' ? 'var(--accent-dim)' : 'var(--bg-secondary)',
            color: mode === 'plain' ? 'var(--accent)' : 'var(--text-muted)',
            border: mode === 'plain' ? '1px solid var(--accent)' : '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
          }}
        >
          Describe in Plain English
        </button>
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={mode === 'diff' ? 'Paste your git diff here...' : 'Describe what you changed and why...'}
        rows={10}
        style={{
          width: '100%',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '16px',
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontFamily: 'JetBrains Mono, monospace',
          resize: 'vertical',
          outline: 'none',
          marginBottom: '16px',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />

      {/* Button */}
      <button
        onClick={generate}
        disabled={loading || !input.trim()}
        style={{
          background: loading || !input.trim() ? 'var(--bg-tertiary)' : 'var(--accent)',
          color: loading || !input.trim() ? 'var(--text-muted)' : '#000',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : '>_ Generate PR Description'}
      </button>

      {error && (
        <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
      )}

      {/* Result */}
      {result && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '2px' }}>
              GENERATED PR DESCRIPTION
            </p>
            <button
              onClick={copy}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: copied ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
              {result.title}
            </h2>

            <p style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
              WHAT CHANGED
            </p>
            <ul style={{ marginBottom: '16px', paddingLeft: '18px' }}>
              {result.whatChanged.map((item, i) => (
                <li key={i} style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>

            <p style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
              WHY
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              {result.why}
            </p>

            <p style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
              TESTING NOTES
            </p>
            <ul style={{ paddingLeft: '18px' }}>
              {result.testingNotes.map((item, i) => (
                <li key={i} style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}