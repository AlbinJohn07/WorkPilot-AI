// Placeholder plans. Replace copy, prices and CTAs once pricing is decided.
export const plans = [
  {
    name: 'Starter',
    description: 'For small teams exploring structured work management.',
    price: 'Pricing to be announced',
    features: ['Employees and departments', 'Projects and tasks', 'Daily work updates', 'Basic reports'],
    cta: 'Get Started',
    to: '/register',
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need project visibility, reporting, and AI assistance.',
    price: 'Pricing to be announced',
    features: ['Everything in Starter', 'Advanced reports and analytics', 'Team collaboration', 'AI-assisted summaries and insights'],
    cta: 'Choose Professional',
    to: '/register?plan=professional',
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations requiring advanced administration and tailored support.',
    price: 'Contact us',
    features: ['Everything in Professional', 'Advanced administration', 'Tailored onboarding and support'],
    cta: 'Contact Sales',
    to: '/contact',
  },
];
