import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { dashboardPathFor } from '../utils/roles.js';

/** Wrap routes that need a signed-in user. Pass `roles` to limit them to specific roles. */
export default function ProtectedRoute({ roles }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500" role="status">
        <Loader2 className="mr-2 animate-spin" size={18} aria-hidden="true" /> Loading your workspace…
      </div>
    );
  }
  if (status !== 'authenticated') return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to={dashboardPathFor(user.role)} replace />;
  return <Outlet />;
}
