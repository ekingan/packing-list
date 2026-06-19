import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { pool, query } from '../db';

async function main() {
  try {
    const result = await query<{ now: Date }>('SELECT now()');
    console.log('Connected successfully. Server time:', result.rows[0].now);

    const tables = await query<{ tablename: string }>(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );
    console.log(
      'Tables:',
      tables.rows.map((r) => r.tablename)
    );
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
