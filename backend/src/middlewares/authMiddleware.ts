import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

/**
 * Extended Request interface to include user data from JWT
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

/**
 * Authentication Middleware
 * Validates JWT token from Authorization header
 */
export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
      return;
    }

    // Verify token
    jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({
          status: 'error',
          message: 'Invalid or expired token'
        });
        return;
      }

      // Attach user data to request
      req.user = decoded as { username: string; role: string };
      next();
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
