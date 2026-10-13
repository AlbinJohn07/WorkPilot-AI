import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Construction size={26} aria-hidden="true" /></span>
      <h1 className="mt-5 text-2xl font-bold text-navy-900">This section is coming soon</h1>
      <p className="mt-2 max-w-sm text-slate-600">It isn’t built yet. Head back to the dashboard in the meantime.</p>
      <Link to="/admin" className="btn-primary mt-6">Back to dashboard</Link>
    </div>
  );
}