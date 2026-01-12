import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';

/**
 * Authentication Controller
 * Handles admin login and JWT token generation
 */
export class AuthController {
  /**
   * Login admin user and generate JWT token
   * POST /api/auth/login
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        res.status(400).json({
          status: 'error',
          message: 'Username and password are required'
        });
        return;
      }

      // Check credentials against environment variables
      if (username !== env.ADMIN_USERNAME) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
        return;
      }

      // Compare password with hashed password
      const isValidPassword = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH);
      
      if (!isValidPassword) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          username: env.ADMIN_USERNAME,
          role: 'admin'
        },
        env.JWT_SECRET,
        { 
          expiresIn: '24h' // Token expires in 24 hours
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          token,
          expiresIn: '24h'
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Verify JWT token (optional endpoint for frontend to check if token is valid)
   * GET /api/auth/verify
   */
  async verify(req: Request, res: Response): Promise<void> {
    try {
      // Token is already verified by auth middleware
      // If we reach here, token is valid
      res.status(200).json({
        status: 'success',
        message: 'Token is valid'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Verification failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
