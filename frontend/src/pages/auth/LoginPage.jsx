import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthCard, { Field } from '../../components/forms/AuthCard.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { parseApiError } from '../../utils/apiError.js';
import { dashboardPathFor } from '../../utils/roles.js';

export default function LoginPage() {
  const { login, user, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (status === 'authenticated' && user) return <Navigate to={dashboardPathFor(user.role)} replace />;

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) found.email = 'Enter a valid work email address.';
    if (!values.password) found.password = 'Enter your password.';
    setErrors(found);
    setFormError('');
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const me = await login(values.email.trim(), values.password);
      navigate(location.state?.from || dashboardPathFor(me.role), { replace: true });
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setErrors(fields);
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Log in to WorkPilot AI" subtitle="Welcome back. Enter your details to continue." footer={<>New here? <Link to="/register" className="font-semibold text-brand-600 hover:underline">Create a workspace</Link></>}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{formError}</p>}
        <Field label="Work email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
        <Field label="Password" type="password" autoComplete="current-password" value={values.password} onChange={set('password')} error={errors.password} />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? 'Signing in…' : 'Log In'}</button>
      </form>
    </AuthCard>
  );
}
