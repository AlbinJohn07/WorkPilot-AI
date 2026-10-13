import { LayoutDashboard, Users, Building2, FolderKanban, CircleCheck, ClipboardCheck, FileText, Lightbulb, Monitor, Smartphone, Megaphone, Settings } from 'lucide-react';

// SAMPLE DATA ONLY. Replace with API calls once the dashboard endpoints exist.
// Due dates are stored as "days from today" so the demo never goes stale.

export const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Employees', to: '/admin/employees', icon: Users },
  { label: 'Departments', to: '/admin/departments', icon: Building2 },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Tasks', to: '/admin/tasks', icon: CircleCheck },
  { label: 'Work Updates', to: '/admin/work-updates', icon: ClipboardCheck },
  { label: 'Reports', to: '/admin/reports', icon: FileText },
  { label: 'AI Insights', to: '/admin/ai-insights', icon: Lightbulb },
];

export const stats = [
  { key: 'employees', label: 'Total Employees', value: 24, change: 8, period: 'vs. last month', tone: 'blue' },
  { key: 'projects', label: 'Active Projects', value: 8, change: 14, period: 'vs. last month', tone: 'violet' },
  { key: 'progress', label: 'Tasks In Progress', value: 18, change: -6, period: 'vs. last week', tone: 'teal' },
  { key: 'completed', label: 'Completed Tasks', value: 42, change: 21, period: 'vs. last week', tone: 'emerald' },
];

export const projects = [
  { name: 'Website Redesign', progress: 92, status: 'On Track', dueInDays: 18, team: ['SW', 'MJ', 'PS'], extra: 3, color: '#2F6FED', icon: Monitor },
  { name: 'Mobile App', progress: 68, status: 'On Track', dueInDays: 33, team: ['DK', 'MJ', 'LM'], extra: 2, color: '#14B8A6', icon: Smartphone },
  { name: 'Marketing Campaign', progress: 45, status: 'At Risk', dueInDays: 3, team: ['AN', 'PS'], extra: 1, color: '#8B5CF6', icon: Megaphone },
  { name: 'HR Portal', progress: 78, status: 'On Track', dueInDays: 59, team: ['SW', 'DK', 'AN'], extra: 2, color: '#38BDF8', icon: Users },
  { name: 'Internal Tools', progress: 60, status: 'On Track', dueInDays: 44, team: ['MJ', 'LM'], extra: 1, color: '#94A3B8', icon: Settings },
];

export const updates = [
  { name: 'Sarah Wilson', role: 'Product Designer', text: 'Completed UI design for the dashboard module.', ago: '2h ago', status: 'Completed' },
  { name: 'Mike Johnson', role: 'Frontend Developer', text: 'Working on API integration for the mobile app.', ago: '3h ago', status: 'In Progress' },
  { name: 'Priya Sharma', role: 'Project Manager', text: 'Updated project timeline and shared with the team.', ago: '5h ago', status: 'Updated' },
  { name: 'David Kim', role: 'Backend Developer', text: 'Fixed authentication issue in the user module.', ago: '6h ago', status: 'In Progress' },
];

export const departmentPerformance = [
  { label: 'Engineering', value: 92, color: '#2F6FED' },
  { label: 'Design', value: 76, color: '#14B8A6' },
  { label: 'Marketing', value: 68, color: '#8B5CF6' },
  { label: 'HR', value: 84, color: '#2F6FED' },
  { label: 'Operations', value: 71, color: '#38BDF8' },
];

export const overdueTasks = 2;

export const quickActions = [
  { label: 'Add Employee', hint: 'Invite new team members', to: '/admin/employees', icon: Users, tone: 'blue' },
  { label: 'Create Project', hint: 'Start a new project', to: '/admin/projects', icon: FolderKanban, tone: 'blue' },
  { label: 'Assign Task', hint: 'Create and assign tasks', to: '/admin/tasks', icon: CircleCheck, tone: 'blue' },
  { label: 'View Reports', hint: 'Check detailed analytics', to: '/admin/reports', icon: FileText, tone: 'blue' },
];