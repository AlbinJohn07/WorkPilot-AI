// status: 'available' = part of the current product; 'planned' = intended, not yet released.
// Review these labels against what the Django backend actually ships today.
export const faqs = [
  { q: 'What is WorkPilot AI?', status: 'available', a: 'WorkPilot AI is a workspace where companies organize employees, departments, projects, tasks, deadlines, and daily work updates in one place.' },
  { q: 'Who can use WorkPilot AI?', status: 'available', a: 'Small and medium-sized businesses, business owners, HR and operations teams, project managers, team leaders, and employees working on assigned tasks.' },
  { q: 'Can managers assign tasks to employees?', status: 'available', a: 'Yes. Managers can assign tasks, set priorities and deadlines, and follow progress across projects.' },
  { q: 'Can employees submit daily work updates?', status: 'available', a: 'Yes. Employees report completed work, progress, blockers, and next steps, so managers do not have to chase status updates.' },
  { q: 'How does the AI assistant help teams?', status: 'planned', a: 'The AI assistant is being designed to summarize submitted updates, highlight overdue tasks and blockers, and turn plain-language instructions into draft tasks. It offers suggestions for people to review; it does not make decisions or measure individual productivity.' },
  { q: 'Can different companies use the same platform securely?', status: 'planned', a: 'WorkPilot AI is designed around organization-level data isolation and role-based permissions, so each company works in its own space. Security capabilities are described as design commitments, not certifications.' },
  { q: 'Can I start without configuring AI features?', status: 'planned', a: 'Yes, that is the intent. Employees, projects, tasks, and updates work on their own, and AI assistance is meant to be an optional layer that administrators control.' },
];
