import { LayoutDashboard, Users, FolderKanban, ListChecks, ClipboardList, BarChart3, Sparkles } from 'lucide-react';

// Illustrative demo data only. Not real customers, employees or statistics.
export const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Employees', icon: Users },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: ListChecks },
  { label: 'Work Updates', icon: ClipboardList },
  { label: 'Reports', icon: BarChart3 },
  { label: 'AI Insights', icon: Sparkles },
];

export const stats = [
  { label: 'Active projects', value: 6 },
  { label: 'Total employees', value: 24 },
  { label: 'Tasks in progress', value: 18 },
  { label: 'Completed tasks', value: 42 },
];

export const projects = [
  { name: 'Client Portal Redesign', progress: 72, status: 'On track' },
  { name: 'Inventory Sync', progress: 45, status: 'At risk' },
  { name: 'Onboarding Workflow', progress: 88, status: 'On track' },
  { name: 'Vendor Reporting', progress: 30, status: 'Delayed' },
];

export const taskStatus = [
  { label: 'Completed', value: 42, color: '#14B8A6' },
  { label: 'In progress', value: 18, color: '#2F6FED' },
  { label: 'Blocked', value: 3, color: '#F59E0B' },
  { label: 'To do', value: 11, color: '#CBD5E1' },
];

export const updates = [
  { who: 'Arjun K.', text: 'Completed the API review for the client portal.', blocker: false },
  { who: 'Nisha P.', text: 'Blocker: waiting on design assets for the onboarding flow.', blocker: true },
  { who: 'Dev S.', text: 'Finished test cases for inventory sync. Starting integration next.', blocker: false },
  { who: 'Lena M.', text: 'Drafted release notes. Next: review with QA.', blocker: false },
];

export const deadlines = [
  { title: 'Client portal beta review', when: 'In 3 days' },
  { title: 'Onboarding workflow sign-off', when: 'In 5 days' },
  { title: 'Vendor report draft', when: 'In 8 days' },
];

export const overdue = [
  { title: 'Update vendor SKU mapping', owner: 'Dev S.', late: '2 days overdue' },
  { title: 'Fix sync retry logic', owner: 'Arjun K.', late: '1 day overdue' },
  { title: 'Collect vendor templates', owner: 'Lena M.', late: '4 days overdue' },
];

export const activity = [
  'Nisha P. submitted a work update',
  'Task “QA checklist” marked completed',
  'Maya R. created project Q4 Onboarding',
  'Dev S. commented on “Sync retry logic”',
];

export const aiInsights = [
  'Two Inventory Sync tasks are past their due dates.',
  'One reported blocker needs a manager decision.',
  'The Client Portal beta review is due in 3 days.',
];
