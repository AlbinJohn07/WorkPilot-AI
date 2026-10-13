import AppRoutes from './routes/AppRoutes.jsx';

// If your existing App.jsx already wraps providers (auth, query client...), keep them
// and render <AppRoutes /> inside them.
export default function App() {
  return <AppRoutes />;
}
