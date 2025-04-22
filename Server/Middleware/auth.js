import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to the request object
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
