import app from './app';
import { config } from './config';
import { pool } from './db';

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection verified');
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`API running on port ${config.port} [${config.nodeEnv}]`);
  });
}

start();
