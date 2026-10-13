import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function addDays(n) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}
export const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
export const daysLeftLabel = (n) => (n === 1 ? '1 day left' : `${n} days left`);

const tones = {
  blue: 'bg-brand-50 text-brand-600',
  violet: 'bg-violet-50 text-violet-600',
  teal: 'bg-teal-50 text-teal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
};
export const toneClass = (t) => tones[t] || tones.blue;

export function IconBadge({ icon: Icon, tone = 'blue', size = 'h-10 w-10', iconSize = 20 }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl ${size} ${toneClass(tone)}`}>
      <Icon size={iconSize} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

const avatarPalette = ['bg-brand-100 text-brand-700', 'bg-teal-100 text-teal-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700'];
export function Avatar({ initials, size = 'h-9 w-9 text-xs', className = '' }) {
  const idx = [...initials].reduce((s, c) => s + c.charCodeAt(0), 0) % avatarPalette.length;
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarPalette[idx]} ${size} ${className}`}>{initials}</span>;
}

const chipTones = {
  teal: 'bg-teal-50 text-teal-700',
  blue: 'bg-brand-50 text-brand-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700',
  slate: 'bg-slate-100 text-slate-600',
};
export const Chip = ({ tone = 'slate', children }) => (
  <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium ${chipTones[tone]}`}>{children}</span>
);

export function DashCard({ icon: Icon, title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-card ${className}`}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon && <Icon size={20} strokeWidth={1.8} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />}
          <div>
            <h2 className="font-semibold text-navy-900">{title}</h2>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export const ViewAllLink = ({ to, children = 'View All' }) => (
  <Link to={to} className="inline-flex shrink-0 items-center gap-1 rounded-md border border-brand-200 px-2.5 py-1 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50">
    {children} <ArrowRight size={12} aria-hidden="true" />
  </Link>
);