import axios from 'axios';
import { env } from '../config/env.js';

export const predictPcosRisk = async (payload) => {
  if (!env.mlApiUrl) {
    return { riskScore: null, source: 'not_configured' };
  }

  try {
    const { data } = await axios.post(env.mlApiUrl, payload, { timeout: 3000 });
    return {
      riskScore: Number(data.riskScore ?? data.risk_score ?? data.score),
      source: 'ml_api',
      raw: data
    };
  } catch (error) {
    return {
      riskScore: null,
      source: 'mock_fallback',
      error: error.message
    };
  }
};
