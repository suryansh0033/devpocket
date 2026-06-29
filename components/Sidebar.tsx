 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, FileText, GitCommit, Home, ChevronRight } from 'lucide-react';

const tools = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Error Explainer', path: '/tools/error-explainer', icon: Terminal },
  { name: 'README Generator', path: '/tools/readme', icon: FileText },
  { name: 'Commit Message', path: '/tools/commit-msg', icon: GitCommit },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '18px' }}>
          &gt;_ DevPocket
        </span>
        <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
          AI tools for developers
        </p>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '10px', padding: '4px 8px', marginBottom: '4px', letterSpacing: '1px' }}>
          TOOLS
        </p>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const active = pathname === tool.path;
          return (
            <Link key={tool.path} href={tool.path} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 8px',
                borderRadius: '6px',
                marginBottom: '2px',
                background: active ? 'var(--accent-dim)' : 'transparent',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}>
                <Icon size={16} />
                <span>{tool.name}</span>
                {active && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontSize: '11px',
      }}>
        devpocket.tech
      </div>
    </aside>
  );
}
