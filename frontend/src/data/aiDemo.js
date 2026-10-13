// Canned responses for the interactive demo. No network calls are made.
export const aiSamples = [
  {
    id: 'summary',
    prompt: 'Summarize our team’s progress today.',
    keywords: ['summar', 'progress', 'today'],
    answer: 'Eight tasks were marked completed in this demonstration. Four tasks remain in progress, and two reported blockers require attention.',
  },
  {
    id: 'risk',
    prompt: 'Which projects may need attention?',
    keywords: ['risk', 'attention', 'blocker', 'overdue', 'project'],
    answer: 'In this demonstration, two tasks in Inventory Sync are overdue and one blocker is waiting on design assets. These may be worth a closer look. Please review the details before acting.',
  },
  {
    id: 'draft',
    prompt: 'Draft a task: prepare the Friday client review.',
    keywords: ['draft', 'create', 'new task'],
    answer: 'Here is a draft for you to review. Nothing is created until you confirm.',
    draft: { Title: 'Prepare the Friday client review', Assignee: 'To be chosen', Priority: 'Medium', 'Due date': 'Friday' },
  },
];
