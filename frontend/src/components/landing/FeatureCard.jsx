export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="card group p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}
