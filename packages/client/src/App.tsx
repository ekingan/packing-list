import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  const env = (import.meta as ImportMeta & { env: Record<string, string> }).env;

  return (
    <Auth0Provider
      domain={env.VITE_AUTH0_DOMAIN}
      clientId={env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: env.VITE_AUTH0_AUDIENCE,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}
