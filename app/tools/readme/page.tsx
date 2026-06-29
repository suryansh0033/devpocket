'use client';

import { useState } from 'react';
import { FileText, Copy, Check, Loader2 } from 'lucide-react';

export default function ReadmeGenerator() {
  const [form, setForm] = useState({
    projectName: '',
    description: '',
    techStack: '',
    features: '',
    installation: '',
    usage: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'raw' | 'preview'>('raw');

  const generate = async () => {
    if (!form.projectName || !form.description) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/readme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.readme) setResult(data.readme);
      else setError('Failed to generate. Try again.');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fields = [
    { key: 'projectName', label: 'Project Name *', placeholder: 'e.g. DevPocket' },
    { key: 'description', label: 'Description *', placeholder: 'What does your project do?' },
    { key: 'techStack', label: 'Tech Stack', placeholder: 'e.g. Next.js, Tailwind, Groq API' },
    { key: 'features', label: 'Key Features', placeholder: 'e.g. AI error explainer, commit message generator' },
    { key: 'installation', label: 'Installation Steps', placeholder: 'e.g. npm install, npm run dev' },
    { key: 'usage', label: 'Usage', placeholder: 'How do users use it?' },
  ];

  return (
    <div style={{ padding: '48px 40px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <FileText size={20} color="var(--accent)" />
          <p style={{ color: 'var(--accent)', fontSize: '13px', letterSpacing: '2px' }}>DOCUMENTATION TOOL</p>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          README Generator
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Fill in the details → get a professional README.md instantly.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '1px', marginBottom: '6px' }}>
              {label.toUpperCase()}
            </p>
            <textarea
              value={form[key as keyof typeof form]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              rows={2}
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                resize: 'vertical',
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
        ))}
      </div>

      <button
        onClick={generate}
        disabled={loading || !form.projectName || !form.description}
        style={{
          background: loading || !form.projectName || !form.description ? 'var(--bg-tertiary)' : 'var(--accent)',
          color: loading || !form.projectName || !form.description ? 'var(--text-muted)' : '#000',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 24px',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'JetBrains Mono, monospace',
          cursor: loading || !form.projectName || !form.description ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
        }}
      >
        {loading ? <><Loader2 size={16} /> Generating...</> : '>_ Generate README'}
      </button>

      {error && <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

      {result && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['raw', 'preview'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  background: tab === t ? 'var(--accent-dim)' : 'transparent',
                  border: `1px solid ${tab === t ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: '4px',
                  padding: '6px 14px',
                  color: tab === t ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                }}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={copy} style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '6px 12px',
              color: copied ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {tab === 'raw' ? (
            <textarea
              readOnly
              value={result}
              rows={20}
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
              }}
            />
          ) : (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '24px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}>
              {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
