import { Link } from 'react-router-dom';
import { Sparkles, Activity, AlertCircle, TrendingUp, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { projects, overdueTasks, quickActions } from '../../data/adminDashboard.js';
import { IconBadge } from './shared.jsx';

export function AIInsightsPanel() {
  const atRisk = projects.filter((p) => p.status === 'At Risk').sort((a, b) => a.dueInDays - b.dueInDays)[0];
  const rows = [
    overdueTasks > 0 && { icon: AlertCircle, tone: 'rose', title: `${overdueTasks} tasks are overdue`, text: 'Requires immediate attention' },
    { icon: TrendingUp, tone: 'teal', title: 'Task completion is up 18%', text: 'Based on submitted work updates' },
    atRisk && { icon: AlertTriangle, tone: 'amber', title: `${atRisk.name} is at risk`, text: `Deadline in ${atRisk.dueInDays} days` },
  ].filter(Boolean);

  return (
    <section className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 shadow-card" aria-labelledby="ai-insights-title">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Sparkles size={26} className="text-brand-600" aria-hidden="true" />
          <div>
            <h2 id="ai-insights-title" className="font-semibold text-navy-900">AI Insights</h2>
            <p className="text-xs text-slate-500">Key insights from your team’s work</p>
          </div>
        </div>
        <Link to="/admin/ai-insights" className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-brand-600 hover:underline">View Details <ArrowRight size={12} aria-hidden="true" /></Link>
      </header>

      <div className="mt-4 flex gap-3 rounded-xl bg-white p-3.5">
        <IconBadge icon={Activity} tone="teal" size="h-9 w-9" iconSize={17} />
        <div>
          <p className="text-sm font-semibold text-ink">Project Health is Good</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Most projects are on track.{atRisk ? ' One project is at risk and needs a look.' : ''}</p>
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {rows.map((r) => (
          <li key={r.title} className="flex gap-3 rounded-xl p-3">
            <IconBadge icon={r.icon} tone={r.tone} size="h-9 w-9" iconSize={17} />
            <div>
              <p className="text-sm font-semibold text-ink">{r.title}</p>
              <p className="text-xs text-slate-500">{r.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 px-1 text-[11px] text-slate-400">AI-assisted summary based on sample data. Review before acting.</p>
    </section>
  );
}

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card" aria-labelledby="quick-actions-title">
      <h2 id="quick-actions-title" className="mb-4 flex items-center gap-2 font-semibold text-navy-900"><Zap size={18} className="text-brand-600" aria-hidden="true" /> Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to} className="group rounded-xl border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <IconBadge icon={a.icon} tone={a.tone} size="h-10 w-10" iconSize={18} />
            <p className="mt-3 text-sm font-semibold text-ink">{a.label}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{a.hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}