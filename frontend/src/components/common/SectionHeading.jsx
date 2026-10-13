export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false, id }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-widest ${light ? 'text-brand-200' : 'text-brand-600'}`}>{eyebrow}</p>
      )}
      <h2 id={id} className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {description && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>}
    </div>
  );
}
