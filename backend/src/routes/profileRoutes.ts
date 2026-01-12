import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { validate, profileSchema } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router
  .route('/')
  .get(ProfileController.getProfile)
  .put(authenticateToken, validate(profileSchema), ProfileController.updateProfile);

export default router;
