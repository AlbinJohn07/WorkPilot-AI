import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy-900 hover:bg-slate-50"
              >
                <span className="flex flex-wrap items-center gap-2">
                  {item.q}
                  {item.status === 'planned' && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">Planned</span>}
                </span>
                <ChevronDown size={18} className={`shrink-0 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen} className="px-5 pb-5 leading-relaxed text-slate-600">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
