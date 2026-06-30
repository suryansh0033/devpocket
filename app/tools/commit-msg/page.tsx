'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitCommit, Copy, Check, Loader2, ArrowLeft } from 'lucide-react';

export default function CommitMsg() {
  const [diff, setDiff] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!diff.trim()) return;
    setLoading(true);
    setError('');
    setMessages([]);

    try {
      const res = await fetch('/api/commit-msg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diff }),
      });
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
      else setError('Failed to generate. Try again.');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '48px 40px', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none', marginBottom: '16px', width: 'fit-content' }}>
          <ArrowLeft size={14} /> Back to home
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <GitCommit size={20} color="var(--accent)" />
          <p style={{ color: 'var(--accent)', fontSize: '13px', letterSpacing: '2px' }}>GIT TOOL</p>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Commit Message AI
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Paste your git diff → get 5 conventional commit messages instantly.
        </p>
      </div>

      {/* How to get diff */}
      <details style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '12px 16px',
        marginBottom: '20px',
        cursor: 'pointer',
      }}>
        <summary style={{ color: 'var(--text-muted)', fontSize: '13px', listStyle: 'none' }}>
          &gt;_ How to get your git diff?
        </summary>
        <div style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.8 }}>
  <p style={{ marginBottom: '8px' }}>Step 1 — Make changes to your code</p>
  <p style={{ marginBottom: '8px' }}>Step 2 — Open terminal in your project folder</p>
  <p style={{ marginBottom: '6px' }}>Step 3 — Run this command:</p>
  <code style={{
    display: 'block',
    background: 'var(--bg-tertiary)',
    padding: '6px 12px',
    borderRadius: '4px',
    marginBottom: '8px',
    color: 'var(--accent)',
  }}>git diff</code>
  <p style={{ marginBottom: '8px' }}>Step 4 — Copy the output and paste it in the box below</p>
  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Using GitHub Desktop? Click on any changed file to see the diff, then copy it.</p>
</div>
      </details>

      {/* Input */}
      <textarea
        value={diff}
        onChange={e => setDiff(e.target.value)}
        placeholder="Paste your git diff here..."
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
        disabled={loading || !diff.trim()}
        style={{
          background: loading || !diff.trim() ? 'var(--bg-tertiary)' : 'var(--accent)',
          color: loading || !diff.trim() ? 'var(--text-muted)' : '#000',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
          cursor: loading || !diff.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : '&gt;_ Generate Messages'}
      </button>

      {error && (
        <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
      )}

      {/* Results */}
      {messages.length > 0 && (
        <div>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '2px', marginBottom: '12px' }}>
            GENERATED MESSAGES
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
              }}>
                <code style={{ color: 'var(--text-primary)', fontSize: '13px', lineHeight: 1.5, flex: 1 }}>
                  {msg}
                </code>
                <button
                  onClick={() => copy(msg, i)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '6px',
                    cursor: 'pointer',
                    color: copied === i ? 'var(--accent)' : 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                >
                  {copied === i ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
