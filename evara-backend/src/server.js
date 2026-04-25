import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Evara backend running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start Evara backend:', error);
  process.exit(1);
});
