import Button from '../../components/common/Button.jsx';

export default function PlaceholderPage({ title, notFound = false }) {
  return (
    <section className="container-page flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-bold text-navy-900">{title}</h1>
      <p className="mt-3 max-w-md text-slate-600">
        {notFound ? 'We could not find that page.' : 'This page is not available yet. It will be added before launch.'}
      </p>
      <Button to="/" className="mt-8">Back to home</Button>
    </section>
  );
}
