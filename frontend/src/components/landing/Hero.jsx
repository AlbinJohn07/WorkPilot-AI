import { CheckCircle2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import DashboardPreview from './DashboardPreview.jsx';

const benefits = ['Clear team visibility', 'Smarter project coordination', 'AI-powered insights'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 -z-0 h-full bg-gradient-to-b from-brand-50/60 to-white" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-14 py-16 lg:grid-cols-[5fr_7fr] lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">AI-Powered Workforce Management</p>
          <h1 id="hero-title" className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl xl:text-[3.5rem]">
            Your Team Works. <span className="block">AI Keeps Everything Moving.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Manage your workforce, organize projects, track daily progress, and turn work updates into actionable business insights — all from one intelligent workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/register">Get Started Free</Button>
            <Button to={{ pathname: '/', hash: '#showcase' }} variant="secondary">Explore the Platform</Button>
          </div>
          <ul className="mt-8 flex flex-col gap-3 text-sm font-medium text-slate-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2"><CheckCircle2 size={18} className="text-teal-500" aria-hidden="true" /> {b}</li>
            ))}
          </ul>
        </div>
        <DashboardPreview variant="hero" className="motion-safe:animate-rise" />
      </div>
    </section>
  );
}
