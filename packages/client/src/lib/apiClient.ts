import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

type GetToken = (opts?: GetTokenSilentlyOptions) => Promise<string>;

async function request<T>(
  path: string,
  getToken: GetToken,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken({
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  });

  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message ?? `Request failed: ${res.status}`);
  }

  return res.json();
}

export function createApiClient(getToken: GetToken) {
  return {
    get: <T>(path: string) => request<T>(path, getToken),
    post: <T>(path: string, body: unknown) =>
      request<T>(path, getToken, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    put: <T>(path: string, body: unknown) =>
      request<T>(path, getToken, {
        method: 'PUT',
        body: JSON.stringify(body),
      }),
    delete: <T>(path: string) =>
      request<T>(path, getToken, { method: 'DELETE' }),
  };
}
