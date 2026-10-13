import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { aiSamples } from '../../data/aiDemo.js';

const normalize = (s) => s.toLowerCase().replace(/[’']/g, '');

function findSample(input) {
  const text = normalize(input);
  return aiSamples.find((s) => normalize(s.prompt) === text) || aiSamples.find((s) => s.keywords.some((k) => text.includes(k)));
}

export default function AIChatPreview() {
  const [thread, setThread] = useState([
    { role: 'user', text: aiSamples[0].prompt },
    { role: 'ai', text: aiSamples[0].answer },
  ]);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [input, setInput] = useState('');
  const timer = useRef(null);
  const scroller = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [thread, status]);

  const ask = (text) => {
    const question = text.trim();
    if (!question || status === 'loading') return;
    const sample = findSample(question);
    setThread((t) => [...t, { role: 'user', text: question }]);
    setInput('');
    if (!sample) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    timer.current = setTimeout(() => {
      setThread((t) => [...t, { role: 'ai', text: sample.answer, draft: sample.draft }]);
      setStatus('idle');
    }, 900);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white"><Sparkles size={15} aria-hidden="true" /></span>
        <div>
          <p className="text-sm font-semibold text-navy-900">WorkPilot AI assistant</p>
          <p className="text-[11px] text-slate-500">Interactive demo · sample responses only</p>
        </div>
      </div>

      <div ref={scroller} className="max-h-80 space-y-3 overflow-y-auto bg-surface p-4" aria-live="polite" aria-label="Conversation">
        {thread.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'bg-navy-900 text-white' : 'border border-slate-200 bg-white text-ink'}`}>
              {m.text}
              {m.draft && (
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg bg-slate-50 p-3 text-xs">
                  {Object.entries(m.draft).map(([k, v]) => (
                    <div key={k} className="contents"><dt className="text-slate-500">{k}</dt><dd className="font-medium text-ink">{v}</dd></div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        ))}
        {status === 'loading' && (
          <p className="flex items-center gap-2 text-xs text-slate-500" role="status"><Loader2 size={14} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> Preparing a sample response…</p>
        )}
        {status === 'error' && (
          <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800" role="alert">
            <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            This demo only answers a few sample questions. Try one of the suggestions below.
          </p>
        )}
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {aiSamples.map((s) => (
            <button key={s.id} type="button" disabled={status === 'loading'} onClick={() => ask(s.prompt)} className="rounded-full border border-slate-300 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700 disabled:opacity-50">
              {s.prompt}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2">
          <label htmlFor="ai-demo-input" className="sr-only">Ask the demo assistant a question</label>
          <input id="ai-demo-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about progress, risks, or draft a task" className="input" />
          <button type="submit" disabled={!input.trim() || status === 'loading'} className="btn-primary !px-3.5" aria-label="Send question"><Send size={16} aria-hidden="true" /></button>
        </form>
        <p className="mt-3 text-[11px] text-slate-500">All data shown is illustrative. AI output is assistance for people to review, not a guaranteed prediction.</p>
      </div>
    </div>
  );
}
