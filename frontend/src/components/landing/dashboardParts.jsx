import { Sparkles, CalendarClock, AlertCircle } from 'lucide-react';
import { LogoMark } from '../common/Logo.jsx';
import { sidebarItems, stats, projects, taskStatus, updates, deadlines, overdue, activity, aiInsights } from '../../data/mock.js';

const statusStyles = {
  'On track': 'bg-teal-50 text-teal-700',
  'At risk': 'bg-amber-50 text-amber-700',
  Delayed: 'bg-rose-50 text-rose-700',
};

export function Panel({ title, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-4 ${className}`}>
      <h3 className="mb-3 text-xs font-semibold text-navy-900">{title}</h3>
      {children}
    </section>
  );
}

export function WindowBar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      </div>
      <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-700">Demo data · illustrative only</span>
    </div>
  );
}

export function Sidebar({ active = 'Dashboard', className = '' }) {
  return (
    <aside className={`w-44 shrink-0 flex-col bg-navy-900 p-3 text-slate-300 ${className}`}>
      <div className="mb-4 flex items-center gap-2 px-2 pt-1 text-sm font-semibold text-white">
        <LogoMark className="h-6 w-6" /> WorkPilot AI
      </div>
      <ul className="space-y-0.5 text-xs">
        {sidebarItems.map(({ label, icon: Icon }) => (
          <li key={label} className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 ${label === active ? 'bg-white/10 font-medium text-white' : ''}`}>
            <Icon size={15} aria-hidden="true" /> {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function StatTiles() {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-3">
          <dt className="text-[11px] text-slate-500">{s.label}</dt>
          <dd className="mt-1 text-2xl font-bold text-navy-900">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectProgress({ limit = 4 }) {
  return (
    <ul className="space-y-3">
      {projects.slice(0, limit).map((p) => (
        <li key={p.name}>
          <div className="mb-1 flex items-center justify-between gap-2 text-xs">
            <span className="truncate font-medium text-ink">{p.name}</span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[p.status]}`}>{p.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${p.name}: ${p.progress}% complete`}>
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${p.progress}%` }} />
            </div>
            <span className="w-8 text-right text-[11px] tabular-nums text-slate-500">{p.progress}%</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TaskDonut() {
  const total = taskStatus.reduce((s, t) => s + t.value, 0);
  const C = 2 * Math.PI * 40;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`Task status: ${taskStatus.map((t) => `${t.value} ${t.label}`).join(', ')}`}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
          {taskStatus.map((t) => {
            const len = (t.value / total) * C;
            const el = <circle key={t.label} cx="50" cy="50" r="40" fill="none" stroke={t.color} strokeWidth="12" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />;
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-navy-900">{total}</span>
          <span className="text-[10px] text-slate-500">tasks</span>
        </div>
      </div>
      <ul className="space-y-1.5 text-xs">
        {taskStatus.map((t) => (
          <li key={t.label} className="flex items-center gap-2 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: t.color }} aria-hidden="true" />
            {t.label} <span className="font-semibold text-ink">{t.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UpdatesList({ limit = 3 }) {
  return (
    <ul className="space-y-3">
      {updates.slice(0, limit).map((u) => (
        <li key={u.who} className="flex gap-2.5 text-xs">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-700" aria-hidden="true">
            {u.who.split(' ').map((w) => w[0]).join('')}
          </span>
          <div className="min-w-0">
            <p className="font-medium text-ink">{u.who}{u.blocker && <span className="ml-2 rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">Blocker</span>}</p>
            <p className="text-slate-500">{u.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DeadlineList() {
  return (
    <ul className="space-y-2.5 text-xs">
      {deadlines.map((d) => (
        <li key={d.title} className="flex items-start gap-2">
          <CalendarClock size={14} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
          <span className="flex-1 text-ink">{d.title}</span>
          <span className="shrink-0 text-slate-500">{d.when}</span>
        </li>
      ))}
    </ul>
  );
}

export function OverdueList() {
  return (
    <ul className="space-y-2.5 text-xs">
      {overdue.map((o) => (
        <li key={o.title} className="flex items-start gap-2">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
          <span className="flex-1 text-ink">{o.title}<span className="block text-slate-500">{o.owner}</span></span>
          <span className="shrink-0 text-rose-600">{o.late}</span>
        </li>
      ))}
    </ul>
  );
}

export function ActivityFeed({ limit = 4 }) {
  return (
    <ul className="space-y-2.5 border-l border-slate-200 pl-3 text-xs text-slate-600">
      {activity.slice(0, limit).map((a) => (
        <li key={a} className="relative before:absolute before:-left-[17px] before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-500">{a}</li>
      ))}
    </ul>
  );
}

export function AIInsightCard() {
  return (
    <section className="rounded-xl border border-brand-200 bg-brand-50 p-4">
      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
        <Sparkles size={14} aria-hidden="true" /> AI insights
      </h3>
      <ul className="space-y-1.5 text-xs text-slate-700">
        {aiInsights.map((i) => <li key={i}>{i}</li>)}
      </ul>
      <p className="mt-3 text-[10px] text-slate-500">AI-assisted summary. Review before acting.</p>
    </section>
  );
}
