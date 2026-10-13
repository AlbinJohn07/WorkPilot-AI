import { useId } from 'react';

export function Field({ label, error, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">{label}</label>
      <input id={id} className="input" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center bg-surface px-4 py-16">
      <div className="card mx-auto w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>
      </div>
    </section>
  );
}
