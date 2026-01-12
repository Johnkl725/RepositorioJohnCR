import { Router } from 'express';
import ExperienceController from '../controllers/ExperienceController';
import { validate, validateObjectId, experienceSchema } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router
  .route('/')
  .get(ExperienceController.getAllExperiences)
  .post(authenticateToken, validate(experienceSchema), ExperienceController.createExperience);

router
  .route('/:id')
  .get(validateObjectId, ExperienceController.getExperienceById)
  .put(authenticateToken, validateObjectId, validate(experienceSchema), ExperienceController.updateExperience)
  .delete(authenticateToken, validateObjectId, ExperienceController.deleteExperience);

export default router;
