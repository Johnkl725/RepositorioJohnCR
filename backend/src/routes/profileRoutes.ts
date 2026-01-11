import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import { validate, profileSchema } from '../middlewares/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(ProfileController.getProfile)
  .put(validate(profileSchema), ProfileController.updateProfile);

export default router;
