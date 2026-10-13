import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

// Temporary shell shared by the three dashboards until the real ones are built.
export default function DashboardPlaceholder({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="card w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
        <p className="mt-2 text-slate-600">You are signed in. This dashboard is a placeholder until the real one is built.</p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-slate-500">Name</dt><dd className="font-medium">{user?.first_name} {user?.last_name}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Email</dt><dd className="font-medium">{user?.email}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Role</dt><dd className="font-medium">{user?.role}</dd></div>
        </dl>
        <button type="button" onClick={onLogout} className="btn-secondary mt-8">Log Out</button>
      </div>
    </main>
  );
}
