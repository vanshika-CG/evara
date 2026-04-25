import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toNumber(process.env.PORT, 8080),
  mongoUri: process.env.MONGO_URI || '',
  mlApiUrl: process.env.ML_API_URL || 'http://localhost:8000/predict',
  jwtSecret: process.env.JWT_SECRET || 'development-secret'
};

export const isProduction = env.nodeEnv === 'production';
