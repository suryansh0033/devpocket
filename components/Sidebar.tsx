'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, FileText, GitCommit, Home, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const tools = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Error Explainer', path: '/tools/error-explainer', icon: Terminal },
  { name: 'README Generator', path: '/tools/readme', icon: FileText },
  { name: 'Commit Message', path: '/tools/commit-msg', icon: GitCommit },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '18px' }}>
            &gt;_ DevPocket
          </span>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
            AI tools for developers
          </p>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
          className="mobile-close"
        >
          <X size={20} />
        </button>
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
            <Link key={tool.path} href={tool.path} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
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
    </>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '8px',
          cursor: 'pointer',
          color: 'var(--accent)',
          display: 'none',
        }}
        className="mobile-menu-btn"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 998,
            display: 'none',
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: '240px',
          minWidth: '240px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}>
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className="mobile-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: mobileOpen ? 0 : '-260px',
          width: '240px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          display: 'none',
          flexDirection: 'column',
          height: '100vh',
          zIndex: 999,
          transition: 'left 0.3s ease',
        }}>
        <NavContent />
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .mobile-sidebar { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-overlay { display: block !important; }
          .mobile-close { display: block !important; }
        }
      `}</style>
    </>
  );
}