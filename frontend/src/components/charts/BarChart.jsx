/** Simple responsive column chart for 0-100 values. data: [{ label, value, color }] */
export default function BarChart({ data, ariaLabel }) {
  const ticks = [100, 75, 50, 25, 0];
  const cols = { gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` };
  return (
    <div role="img" aria-label={ariaLabel}>
      <div className="relative ml-10 h-44">
        {ticks.map((t) => (
          <div key={t} className="absolute inset-x-0 border-t border-dashed border-slate-200" style={{ bottom: `${t}%` }}>
            <span className="absolute -left-10 w-8 -translate-y-1/2 text-right text-[10px] text-slate-400">{t}%</span>
          </div>
        ))}
        <div className="absolute inset-0 grid" style={cols}>
          {data.map((d) => (
            <div key={d.label} className="relative flex justify-center">
              <span className="absolute text-[11px] font-semibold text-ink" style={{ bottom: `calc(${d.value}% + 4px)` }}>{d.value}%</span>
              <div className="absolute bottom-0 w-9 max-w-[70%] rounded-t-md" style={{ height: `${d.value}%`, background: d.color }} />
            </div>
          ))}
        </div>
      </div>
      <div className="ml-10 mt-2 grid text-center text-[11px] text-slate-500" style={cols}>
        {data.map((d) => <span key={d.label} className="truncate px-0.5">{d.label}</span>)}
      </div>
    </div>
  );
}