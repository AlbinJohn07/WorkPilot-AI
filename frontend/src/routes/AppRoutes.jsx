import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import LandingPage from '../pages/public/LandingPage.jsx';
import PlaceholderPage from '../pages/public/PlaceholderPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import AdminDashboard from '../pages/dashboard/AdminDashboard.jsx';
import ManagerDashboard from '../pages/dashboard/ManagerDashboard.jsx';
import EmployeeDashboard from '../pages/dashboard/EmployeeDashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import ComingSoon from '../pages/dashboard/ComingSoon.jsx';
import { ROLES } from '../utils/roles.js';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      </Route>

      {/* Signed-in routes. Wrap these in your DashboardLayout if it renders an <Outlet />. */}
      <Route element={<ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.COMPANY_ADMIN]} />}>
        <Route path="/admin" element={<DashboardLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="*" element={<ComingSoon />} />
</Route>
      </Route>
      <Route element={<ProtectedRoute roles={[ROLES.MANAGER, ROLES.TEAM_LEADER]} />}>
        <Route path="/manager" element={<ManagerDashboard />} />
      </Route>
      <Route element={<ProtectedRoute roles={[ROLES.EMPLOYEE]} />}>
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="*" element={<PlaceholderPage title="Page not found" notFound />} />
      </Route>
    </Routes>
  );
}
