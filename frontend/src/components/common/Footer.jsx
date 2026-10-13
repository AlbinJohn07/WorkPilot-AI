import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const hash = (h) => ({ pathname: '/', hash: h });

const columns = [
  { title: 'Product', links: [['Features', hash('#features')], ['AI Capabilities', hash('#ai')], ['How It Works', hash('#how-it-works')], ['Pricing', hash('#pricing')]] },
  { title: 'Solutions', links: [['Business Owners', hash('#solutions')], ['Managers', hash('#solutions')], ['Team Leaders', hash('#solutions')], ['Employees', hash('#solutions')]] },
  { title: 'Resources', links: [['FAQ', hash('#faq')], ['Security and trust', hash('#security')], ['Log In', '/login'], ['Get Started', '/register']] },
  { title: 'Contact', links: [['Contact us', '/contact'], ['Contact Sales', '/contact']] },
];

export default function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-slate-300">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2.6fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            WorkPilot AI helps companies organize employees, projects, tasks, deadlines, and daily work updates in one intelligent workspace.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-slate-400 transition-colors hover:text-white">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WorkPilot AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
