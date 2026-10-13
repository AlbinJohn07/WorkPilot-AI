import { FolderKanban, BarChart3, CalendarDays } from 'lucide-react';
import BarChart from '../../components/charts/BarChart.jsx';
import { projects, departmentPerformance } from '../../data/adminDashboard.js';
import { Avatar, Chip, DashCard, ViewAllLink, addDays, formatDate, daysLeftLabel } from './shared.jsx';

export function ActiveProjectsCard() {
  return (
    <DashCard icon={FolderKanban} title="Active Projects" subtitle="Project status and progress overview" action={<ViewAllLink to="/admin/projects">View All Projects</ViewAllLink>}>
      <div className="-mx-1 overflow-x-auto px-1">
        <table className="w-full min-w-[540px] text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500">
              {['Project Name', 'Progress', 'Status', 'Due Date', 'Team'].map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-medium first:rounded-l-lg last:rounded-r-lg">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => {
              const Icon = p.icon;
              const risk = p.status === 'At Risk';
              return (
                <tr key={p.name}>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2.5 font-medium text-ink">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${p.color}1A`, color: p.color }}><Icon size={15} aria-hidden="true" /></span>
                      {p.name}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2">
                      <span className="tabular-nums text-slate-600">{p.progress}%</span>
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`${p.progress}% complete`}>
                        <span className={`block h-full rounded-full ${risk ? 'bg-amber-400' : 'bg-brand-500'}`} style={{ width: `${p.progress}%` }} />
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-3"><Chip tone={risk ? 'amber' : 'teal'}>{p.status}</Chip></td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatDate(addDays(p.dueInDays))}</td>
                  <td className="px-3 py-3">
                    <span className="flex items-center">
                      {p.team.map((t) => <Avatar key={t} initials={t} size="h-6 w-6 text-[9px]" className="-ml-1.5 ring-2 ring-white first:ml-0" />)}
                      <span className="ml-1.5 text-[11px] text-slate-500">+{p.extra}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashCard>
  );
}

export function TeamPerformanceCard() {
  return (
    <DashCard icon={BarChart3} title="Team Performance" subtitle="Task completion rate by department">
      <BarChart data={departmentPerformance} ariaLabel={`Task completion rate by department: ${departmentPerformance.map((d) => `${d.label} ${d.value}%`).join(', ')}`} />
    </DashCard>
  );
}

export function DeadlinesCard() {
  const upcoming = [...projects].sort((a, b) => a.dueInDays - b.dueInDays).slice(0, 3);
  const tone = (n) => (n <= 3 ? 'rose' : n <= 14 ? 'amber' : 'slate');
  return (
    <DashCard icon={CalendarDays} title="Upcoming Deadlines" action={<ViewAllLink to="/admin/projects" />}>
      <ul className="divide-y divide-slate-100 text-xs">
        {upcoming.map((p) => (
          <li key={p.name} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: p.color }} aria-hidden="true" />
            <span className="flex-1 font-medium text-ink">{p.name}</span>
            <span className="hidden text-slate-500 sm:inline">{formatDate(addDays(p.dueInDays))}</span>
            <Chip tone={tone(p.dueInDays)}>{daysLeftLabel(p.dueInDays)}</Chip>
          </li>
        ))}
      </ul>
    </DashCard>
  );
}