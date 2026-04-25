export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  req.user = authHeader ? { token: authHeader.replace('Bearer ', '') } : null;
  next();
};
