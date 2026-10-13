import { Link } from 'react-router-dom';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  light: 'btn-light',
  outlineLight: 'btn-outline-light',
};

// Renders a router <Link> when `to` is given, otherwise a <button>.
export default function Button({ to, variant = 'primary', className = '', children, ...props }) {
  const cls = `${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  return <button type="button" className={cls} {...props}>{children}</button>;
}
