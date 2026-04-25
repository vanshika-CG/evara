import { scanIngredients } from '../../integrations/ocrService.js';

export const scanProduct = (payload) => scanIngredients(payload);
