import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const config = {
  port: parseInt(optionalEnv('PORT', '4001'), 10),
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  isProduction: process.env.NODE_ENV === 'production',
  database: {
    url: requireEnv('DATABASE_URL'),
  },
  auth0: {
    domain: requireEnv('AUTH0_DOMAIN'),
    audience: requireEnv('AUTH0_AUDIENCE'),
  },
} as const;
