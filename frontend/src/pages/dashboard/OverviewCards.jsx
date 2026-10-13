import { ArrowUp, ArrowDown, BarChart3, FileText, Users, FolderKanban, ClipboardCheck, CircleCheck } from 'lucide-react';
import DonutChart from '../../components/charts/DonutChart.jsx';
import { stats, projects, updates } from '../../data/adminDashboard.js';
import { Avatar, Chip, DashCard, IconBadge, ViewAllLink } from './shared.jsx';

const statIcons = { employees: Users, projects: FolderKanban, progress: ClipboardCheck, completed: CircleCheck };

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((s) => {
        const up = s.change >= 0;
        return (
          <article key={s.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <IconBadge icon={statIcons[s.key]} tone={s.tone} size="h-11 w-11" />
              <p className="text-sm text-slate-600">{s.label}</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-navy-900">{s.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${up ? 'text-teal-600' : 'text-rose-600'}`}>
              {up ? <ArrowUp size={13} aria-hidden="true" /> : <ArrowDown size={13} aria-hidden="true" />}
              <span className="sr-only">{up ? 'Up' : 'Down'}</span>{Math.abs(s.change)}%
              <span className="font-normal text-slate-500">{s.period}</span>
            </p>
          </article>
        );
      })}
    </div>
  );
}

export function ProjectProgressCard() {
  const overall = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length);
  const segments = projects.map((p) => ({ label: p.name, value: p.progress, color: p.color }));
  return (
    <DashCard icon={BarChart3} title="Project Progress" subtitle="Overall progress across all active projects" action={<ViewAllLink to="/admin/projects">View All Projects</ViewAllLink>}>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <DonutChart segments={segments} centerValue={`${overall}%`} centerLabel="Overall Progress" ariaLabel={`Overall progress ${overall}%. ${projects.map((p) => `${p.name} ${p.progress}%`).join(', ')}`} />
        <ul className="w-full space-y-3 text-sm">
          {projects.map((p) => (
            <li key={p.name} className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden="true" />
              <span className="flex-1 text-slate-700">{p.name}</span>
              <span className="font-semibold tabular-nums text-ink">{p.progress}%</span>
            </li>
          ))}
        </ul>
      </div>
    </DashCard>
  );
}

const statusTone = { Completed: 'teal', 'In Progress': 'blue', Updated: 'teal' };

export function RecentUpdatesCard() {
  return (
    <DashCard icon={FileText} title="Recent Work Updates" subtitle="Latest updates from your team" action={<ViewAllLink to="/admin/work-updates" />}>
      <ul className="divide-y divide-slate-100">
        {updates.map((u) => (
          <li key={u.name} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <Avatar initials={u.name.split(' ').map((w) => w[0]).join('')} size="h-10 w-10 text-xs" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{u.name}</p>
              <p className="text-[11px] text-slate-500">{u.role}</p>
              <p className="mt-0.5 text-xs text-slate-600">{u.text}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-[11px] text-slate-400">{u.ago}</span>
              <Chip tone={statusTone[u.status]}>{u.status}</Chip>
            </div>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}