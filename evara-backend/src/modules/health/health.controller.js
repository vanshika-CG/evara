import { personalize } from '../../orchestrator/personalize.js';

const validatePersonalizePayload = (body) => {
  const requiredFields = ['age', 'height', 'weight'];
  const missing = requiredFields.filter((field) => body[field] === undefined || body[field] === null);

  if (missing.length) {
    const error = new Error(`Missing required fields: ${missing.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }
};

export const personalizeHealth = async (req, res, next) => {
  try {
    validatePersonalizePayload(req.body);
    const result = await personalize(req.body);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
