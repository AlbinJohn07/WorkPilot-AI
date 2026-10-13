import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X, ChevronDown, ChevronRight, Building2, LogOut } from 'lucide-react';
import { LogoMark } from '../components/common/Logo.jsx';
import { Avatar } from '../pages/dashboard/shared.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { adminNav } from '../data/adminDashboard.js';

const ROLE_LABELS = { SUPER_ADMIN: 'Super Admin', COMPANY_ADMIN: 'Company Admin', MANAGER: 'Manager', TEAM_LEADER: 'Team Leader', EMPLOYEE: 'Employee' };

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Account';
  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase() || (user?.email?.[0] || '?').toUpperCase();
  const roleLabel = ROLE_LABELS[user?.role] || 'Member';
  // Adjust if your /me/ response names the company differently.
  const companyName = user?.company_name || user?.company?.name || 'Your company';

  useEffect(() => { setSidebarOpen(false); setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onDown = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') { setMenuOpen(false); setSidebarOpen(false); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const onLogout = async () => { await logout(); navigate('/login', { replace: true }); };

  return (
    <div className="min-h-screen bg-surface">
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-navy-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}

      <aside id="sidebar" className={`on-dark fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-navy-900 text-slate-300 transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-5">
          <span className="flex items-center gap-2.5 text-lg font-bold text-white"><LogoMark className="h-8 w-8" /> WorkPilot AI</span>
          <button type="button" className="rounded-md p-1 text-slate-300 hover:text-white lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <nav aria-label="Dashboard" className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
          {adminNav.map(({ label, to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-brand-600 text-white' : 'hover:bg-white/10 hover:text-white'}`}>
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white"><Building2 size={19} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{companyName}</p>
              <p className="text-xs text-slate-400">{roleLabel}</p>
            </div>
            <ChevronRight size={16} className="text-slate-400" aria-hidden="true" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy-900 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu" aria-expanded={sidebarOpen} aria-controls="sidebar"><Menu size={20} /></button>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label htmlFor="global-search" className="sr-only">Search employees, projects, tasks</label>
            <input id="global-search" type="search" placeholder="Search employees, projects, tasks..." className="input !rounded-xl !py-2.5 !pl-10" />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <button type="button" className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications"><Bell size={20} /></button>
            <div className="relative" ref={menuRef}>
              <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-haspopup="menu" className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-slate-100">
                <Avatar initials={initials} size="h-9 w-9 text-xs" />
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold leading-tight text-ink">{fullName}</span>
                  <span className="block text-xs text-slate-500">{roleLabel}</span>
                </span>
                <ChevronDown size={16} className="hidden text-slate-400 sm:block" aria-hidden="true" />
              </button>
              {menuOpen && (
                <div role="menu" className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-window">
                  <p className="truncate px-3 py-2 text-xs text-slate-500">{user?.email}</p>
                  <button type="button" role="menuitem" onClick={onLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-slate-100"><LogOut size={16} aria-hidden="true" /> Log Out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}