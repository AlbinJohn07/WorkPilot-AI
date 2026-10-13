import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import SectionHeading from '../common/SectionHeading.jsx';
import FeatureCard from './FeatureCard.jsx';
import AIChatPreview from './AIChatPreview.jsx';
import DashboardPreview from './DashboardPreview.jsx';
import FAQ from './FAQ.jsx';
import { Check } from 'lucide-react';
import { valueCards, features, aiCapabilities, steps } from '../../data/features.js';
import { solutions, trustPrinciples } from '../../data/solutions.js';
import { plans } from '../../data/pricing.js';
import { faqs } from '../../data/faq.js';

export function ValueSection() {
  return (
    <section id="value" className="section-y bg-surface" aria-labelledby="value-title">
      <div className="container-page">
        <SectionHeading id="value-title" title="Bring Your People, Projects, and Progress Together." description="Stop managing work across scattered spreadsheets, chats, and disconnected tools. Give your team one shared workspace with clear responsibilities and meaningful visibility." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valueCards.map((c) => <FeatureCard key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="section-y bg-white" aria-labelledby="features-title">
      <div className="container-page">
        <SectionHeading id="features-title" title="Everything You Need to Manage Work Better." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </div>
    </section>
  );
}

export function AISection() {
  return (
    <section id="ai" className="section-y bg-brand-50" aria-labelledby="ai-title">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" id="ai-title" eyebrow="Intelligence built into your workflow" title="Know What Needs Attention Before It Becomes a Problem." description="WorkPilot AI helps teams turn everyday work updates into useful summaries and recommendations, so managers can focus on decisions instead of chasing information." />
          <ul className="mt-10 space-y-6">
            {aiCapabilities.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-card"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                  <h3 className="font-semibold text-navy-900">{title}</h3>
                  <p className="mt-1 text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-slate-600">
            AI offers suggestions for people to review. It does not covertly monitor employees or decide how productive any individual is.
          </p>
        </div>
        <AIChatPreview />
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-y bg-white" aria-labelledby="how-title">
      <div className="container-page">
        <SectionHeading id="how-title" title="Simple for Employees. Powerful for Managers." />
        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          <span className="absolute left-[1.35rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-slate-200 max-lg:block lg:left-[12%] lg:right-[12%] lg:top-[1.35rem] lg:h-px lg:w-auto" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white ring-8 ring-white">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-1.5 text-slate-600 lg:px-2">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ShowcaseSection() {
  return (
    <section id="showcase" className="section-y bg-surface" aria-labelledby="showcase-title">
      <div className="container-page">
        <SectionHeading id="showcase-title" title="One Clear View of Your Entire Workflow." description="Task status, project progress, work updates, deadlines, overdue work, and AI-assisted insights, together in one workspace." />
        <div className="mt-14"><DashboardPreview variant="showcase" /></div>
      </div>
    </section>
  );
}

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-y bg-white" aria-labelledby="solutions-title">
      <div className="container-page">
        <SectionHeading id="solutions-title" title="Designed for Everyone Who Keeps Work Moving." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => <FeatureCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section id="security" className="on-dark section-y bg-navy-900" aria-labelledby="security-title">
      <div className="container-page">
        <SectionHeading light id="security-title" title="Visibility Without Compromising Trust." description="These are the principles WorkPilot AI is being designed around." />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {trustPrinciples.map(({ icon: Icon, title, description }) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Icon size={22} strokeWidth={1.8} className="text-brand-200" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-400">
          These are product design commitments and capabilities to be implemented. WorkPilot AI does not currently claim any security certifications, audits, or regulatory compliance.
        </p>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="section-y bg-surface" aria-labelledby="pricing-title">
      <div className="container-page">
        <SectionHeading id="pricing-title" title="Choose a Plan That Fits Your Team." description="Pricing is not final. Plan details below are placeholders." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <article key={p.name} className={`card flex flex-col p-8 ${p.highlight ? 'border-brand-600 ring-1 ring-brand-600' : ''}`}>
              <h3 className="text-xl font-bold text-navy-900">{p.name}</h3>
              {p.highlight && <p className="mt-1 text-xs font-medium text-brand-600">Suggested for growing teams</p>}
              <p className="mt-3 text-slate-600">{p.description}</p>
              <p className="mt-6 text-lg font-semibold text-navy-900">{p.price}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
                {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check size={18} className="shrink-0 text-teal-500" aria-hidden="true" />{f}</li>)}
              </ul>
              <Button to={p.to} variant={p.highlight ? 'primary' : 'secondary'} className="mt-8">{p.cta}</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="section-y bg-white" aria-labelledby="faq-title">
      <div className="container-page max-w-3xl">
        <SectionHeading id="faq-title" title="Frequently Asked Questions" />
        <div className="mt-12"><FAQ items={faqs} /></div>
        <p className="mt-4 text-center text-sm text-slate-500">Questions marked “Planned” describe capabilities that are not released yet.</p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="on-dark bg-navy-900 py-20 lg:py-24" aria-labelledby="cta-title">
      <div className="container-page text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Give Your Team the Clarity to Do Its Best Work.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">Bring projects, people, updates, and intelligent insights together in one workspace.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/register" variant="light">Get Started Free</Button>
          <Button to={{ pathname: '/', hash: '#features' }} variant="outlineLight">Explore Features</Button>
        </div>
      </div>
    </section>
  );
}
