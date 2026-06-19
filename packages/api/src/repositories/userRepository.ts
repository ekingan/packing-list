import { query } from '../db';

export interface UserRow {
  id: string;
  auth0_sub: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export async function findUserByAuth0Sub(
  auth0Sub: string
): Promise<UserRow | null> {
  const result = await query<UserRow>(
    'SELECT * FROM users WHERE auth0_sub = $1',
    [auth0Sub]
  );
  return result.rows[0] ?? null;
}

export async function upsertUser(
  auth0Sub: string,
  email: string
): Promise<UserRow> {
  const result = await query<UserRow>(
    `INSERT INTO users (auth0_sub, email)
     VALUES ($1, $2)
     ON CONFLICT (auth0_sub)
     DO UPDATE SET email = EXCLUDED.email, updated_at = now()
     RETURNING *`,
    [auth0Sub, email]
  );
  return result.rows[0];
}
