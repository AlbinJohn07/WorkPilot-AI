import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthCard, { Field } from '../../components/forms/AuthCard.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { parseApiError } from '../../utils/apiError.js';
import { dashboardPathFor } from '../../utils/roles.js';

// Field names match the Django register endpoint.
const empty = { company_name: '', first_name: '', last_name: '', email: '', password: '' };

export default function RegisterPage() {
  const { register, user, status } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (status === 'authenticated' && user) return <Navigate to={dashboardPathFor(user.role)} replace />;

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!values.company_name.trim()) found.company_name = 'Enter your company name.';
    if (!values.first_name.trim()) found.first_name = 'Enter your first name.';
    if (!values.last_name.trim()) found.last_name = 'Enter your last name.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) found.email = 'Enter a valid work email address.';
    if (values.password.length < 8) found.password = 'Use at least 8 characters.';
    setErrors(found);
    setFormError('');
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const me = await register({ ...values, company_name: values.company_name.trim(), first_name: values.first_name.trim(), last_name: values.last_name.trim(), email: values.email.trim() });
      navigate(dashboardPathFor(me.role), { replace: true });
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setErrors(fields);
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Create your workspace" subtitle="Register your company, then invite your team." footer={<>Already have an account? <Link to="/login" className="font-semibold text-brand-600 hover:underline">Log in</Link></>}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{formError}</p>}
        <Field label="Company name" autoComplete="organization" value={values.company_name} onChange={set('company_name')} error={errors.company_name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" autoComplete="given-name" value={values.first_name} onChange={set('first_name')} error={errors.first_name} />
          <Field label="Last name" autoComplete="family-name" value={values.last_name} onChange={set('last_name')} error={errors.last_name} />
        </div>
        <Field label="Work email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} />
        <Field label="Password" type="password" autoComplete="new-password" value={values.password} onChange={set('password')} error={errors.password} />
        <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? 'Creating workspace…' : 'Get Started Free'}</button>
      </form>
    </AuthCard>
  );
}
