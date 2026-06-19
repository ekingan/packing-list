import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

interface User {
  id: string;
  email: string;
  created_at: string;
}

export function DashboardPage() {
  const api = useApi();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ success: true; data: { user: User } }>('/api/v1/users/me')
      .then((res) => setUser(res.data.user))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <p>Member since {new Date(user.created_at).toLocaleDateString()}</p>
    </main>
  );
}
