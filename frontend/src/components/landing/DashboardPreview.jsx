import { Panel, WindowBar, Sidebar, StatTiles, ProjectProgress, TaskDonut, UpdatesList, DeadlineList, OverdueList, ActivityFeed, AIInsightCard } from './dashboardParts.jsx';

/** variant="hero" is compact; variant="showcase" shows the full workflow view. */
export default function DashboardPreview({ variant = 'hero', className = '' }) {
  const showcase = variant === 'showcase';
  return (
    <div role="group" aria-label="Illustrative preview of the WorkPilot AI dashboard, shown with demo data" className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-window ${className}`}>
      <WindowBar />
      <div className="flex">
        <Sidebar className="hidden md:flex" />
        <div className="min-w-0 flex-1 space-y-4 bg-surface p-4 sm:p-5">
          <div>
            <h3 className="text-base font-semibold text-navy-900">Welcome back, Maya</h3>
            <p className="text-xs text-slate-500">Here is where your projects stand today.</p>
          </div>
          <StatTiles />

          {showcase ? (
            <>
              <div className="grid gap-4 lg:grid-cols-5">
                <Panel title="Task status overview" className="lg:col-span-2"><TaskDonut /></Panel>
                <Panel title="Project progress" className="lg:col-span-3"><ProjectProgress /></Panel>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Panel title="Employee work updates"><UpdatesList limit={3} /></Panel>
                <Panel title="Upcoming deadlines"><DeadlineList /></Panel>
                <Panel title="Overdue tasks"><OverdueList /></Panel>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Panel title="Recent activity"><ActivityFeed /></Panel>
                <AIInsightCard />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-5">
                <Panel title="Project progress" className="md:col-span-3"><ProjectProgress limit={3} /></Panel>
                <div className="md:col-span-2"><AIInsightCard /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Panel title="Recent work updates"><UpdatesList limit={2} /></Panel>
                <Panel title="Activity"><ActivityFeed limit={3} /></Panel>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
