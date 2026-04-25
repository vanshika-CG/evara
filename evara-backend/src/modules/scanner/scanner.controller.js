import * as scannerService from './scanner.service.js';

export const scanProduct = async (req, res, next) => {
  try {
    const result = await scannerService.scanProduct(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
