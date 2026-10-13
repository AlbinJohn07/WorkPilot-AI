import { Link } from 'react-router-dom';

export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#0B1F3A" />
      <path d="M9 21l5-6 4 3 5-8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="21" r="2.4" fill="#2F6FED" />
      <circle cx="14" cy="15" r="1.6" fill="#fff" />
      <circle cx="23" cy="10" r="2.4" fill="#2DD4BF" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 rounded-md" aria-label="WorkPilot AI home">
      <LogoMark />
      <span className={`text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
        WorkPilot <span className={light ? 'text-brand-200' : 'text-brand-600'}>AI</span>
      </span>
    </Link>
  );
}
