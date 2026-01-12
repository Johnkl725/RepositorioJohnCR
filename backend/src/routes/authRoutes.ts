import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

/**
 * Authentication Routes
 * Base path: /api/auth
 */

// POST /api/auth/login - Login and get JWT token
router.post('/login', authController.login.bind(authController));

// GET /api/auth/verify - Verify if token is valid (protected route)
router.get('/verify', authenticateToken, authController.verify.bind(authController));

export default router;
