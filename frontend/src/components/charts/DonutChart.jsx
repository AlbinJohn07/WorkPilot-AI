/** Multi-segment donut. segments: [{ label, value, color }] */
export default function DonutChart({ segments, centerValue, centerLabel, ariaLabel, size = 'h-44 w-44' }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const R = 42;
  const C = 2 * Math.PI * R;
  const gap = 1.5;
  let offset = 0;
  return (
    <div className={`relative shrink-0 ${size}`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={ariaLabel}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="#F1F5F9" strokeWidth="16" />
        {segments.map((s) => {
          const len = (s.value / total) * C;
          const el = <circle key={s.label} cx="60" cy="60" r={R} fill="none" stroke={s.color} strokeWidth="16" strokeDasharray={`${Math.max(len - gap, 0)} ${C - len + gap}`} strokeDashoffset={-offset} />;
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-navy-900">{centerValue}</span>
        <span className="text-xs text-slate-500">{centerLabel}</span>
      </div>
    </div>
  );
}