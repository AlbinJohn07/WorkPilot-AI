import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { dashboardPathFor } from '../../utils/roles.js';

export const NAV_LINKS = [
  { label: 'Features', hash: '#features' },
  { label: 'Solutions', hash: '#solutions' },
  { label: 'How It Works', hash: '#how-it-works' },
  { label: 'AI Capabilities', hash: '#ai' },
  { label: 'Pricing', hash: '#pricing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, status, logout } = useAuth();
  const signedIn = status === 'authenticated' && user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.key]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const linkCls = 'rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-navy-900';

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow ${scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'}`}>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.hash} to={{ pathname: '/', hash: l.hash }} className={linkCls}>{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {signedIn ? (
            <>
              <Button variant="secondary" className="border-transparent !py-2" onClick={logout}>Log Out</Button>
              <Button to={dashboardPathFor(user.role)} className="!py-2">Dashboard</Button>
            </>
          ) : (
            <>
              <Button to="/login" variant="secondary" className="border-transparent !py-2">Log In</Button>
              <Button to="/register" className="!py-2">Get Started Free</Button>
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy-900 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div id="mobile-menu" hidden={!open} className="border-t border-slate-200 bg-white lg:hidden">
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link key={l.hash} to={{ pathname: '/', hash: l.hash }} className={`${linkCls} py-3 text-base`}>{l.label}</Link>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-3">
            {signedIn ? (
              <>
                <Button variant="secondary" onClick={logout}>Log Out</Button>
                <Button to={dashboardPathFor(user.role)}>Dashboard</Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="secondary">Log In</Button>
                <Button to="/register">Get Started Free</Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
