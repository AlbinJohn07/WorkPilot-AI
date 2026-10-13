import { CalendarDays, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { StatCards, ProjectProgressCard, RecentUpdatesCard } from '../../pages/dashboard/OverviewCards.jsx';
import { ActiveProjectsCard, TeamPerformanceCard, DeadlinesCard } from '../../pages/dashboard/ProjectCards.jsx';
import { AIInsightsPanel, QuickActions } from '../../pages/dashboard/Rail.jsx';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">{greeting()}, {user?.first_name || 'there'}!</h1>
          <p className="mt-1 text-slate-600">Here’s what’s happening with your team and projects today.</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="flex items-center gap-2 text-sm text-slate-600"><CalendarDays size={16} className="text-brand-600" aria-hidden="true" /> {today}</p>
          <p className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"><Info size={13} aria-hidden="true" /> Sample data. Live figures appear once the dashboard APIs are connected.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <StatCards />
          <div className="grid gap-6 lg:grid-cols-2">
            <ProjectProgressCard />
            <RecentUpdatesCard />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ActiveProjectsCard />
            <div className="min-w-0 space-y-6">
              <TeamPerformanceCard />
              <DeadlinesCard />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <AIInsightsPanel />
          <QuickActions />
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-500">WorkPilot AI <span className="mx-1.5">|</span> Your Team Works. AI Keeps Everything Moving.</p>
    </div>
  );
}