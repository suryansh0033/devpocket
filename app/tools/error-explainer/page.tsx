'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, Loader2 } from 'lucide-react';

export default function ErrorExplainer() {
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState<{ explanation: string; cause: string; fix: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState('');

  const explain = async () => {
    if (!error.trim()) return;
    setLoading(true);
    setErr('');
    setResult(null);

    try {
      const res = await fetch('/api/error-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error, language }),
      });
      const data = await res.json();
      if (data.explanation) setResult(data);
      else setErr('Failed to explain. Try again.');
    } catch {
      setErr('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '48px 40px', maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Terminal size={20} color="var(--accent)" />
          <p style={{ color: 'var(--accent)', fontSize: '13px', letterSpacing: '2px' }}>DEBUGGING TOOL</p>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Error Explainer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Paste any error message → get a plain English explanation + fix.
        </p>
      </div>

      {/* Language input */}
      <input
        value={language}
        onChange={e => setLanguage(e.target.value)}
        placeholder="Language / Framework (optional) — e.g. React, Python, Next.js"
        style={{
          width: '100%',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '12px 16px',
          color: 'var(--text-primary)',
          fontSize: '13px',
          fontFamily: 'JetBrains Mono, monospace',
          outline: 'none',
          marginBottom: '12px',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />

      {/* Error input */}
      <textarea
        value={error}
        onChange={e => setError(e.target.value)}
        placeholder="Paste your error message here..."
        rows={8}
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
        onClick={explain}
        disabled={loading || !error.trim()}
        style={{
          background: loading || !error.trim() ? 'var(--bg-tertiary)' : 'var(--accent)',
          color: loading || !error.trim() ? 'var(--text-muted)' : '#000',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
          cursor: loading || !error.trim() ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {loading ? <><Loader2 size={16} /> Explaining...</> : '>_ Explain Error'}
      </button>

      {err && <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '16px' }}>{err}</p>}

      {/* Result */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'WHAT IT MEANS', content: result.explanation },
            { label: 'LIKELY CAUSE', content: result.cause },
            { label: 'HOW TO FIX', content: result.fix },
          ].map(({ label, content }) => (
            <div key={label} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '20px',
            }}>
              <p style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '2px', marginBottom: '10px' }}>
                {label}
              </p>
              <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.7 }}>
                {content}
              </p>
            </div>
          ))}

          <button
            onClick={() => copy(`What it means:\n${result.explanation}\n\nLikely cause:\n${result.cause}\n\nHow to fix:\n${result.fix}`)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '10px 16px',
              color: copied ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: 'fit-content',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy all'}
          </button>
        </div>
      )}
    </div>
  );
}