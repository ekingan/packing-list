import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export function HomePage() {
  const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Packing List</h1>
      <button onClick={() => loginWithRedirect()}>Log in</button>
    </main>
  );
}
