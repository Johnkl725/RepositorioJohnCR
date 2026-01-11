import { Router } from 'express';
import ExperienceController from '../controllers/ExperienceController';
import { validate, validateObjectId, experienceSchema } from '../middlewares/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(ExperienceController.getAllExperiences)
  .post(validate(experienceSchema), ExperienceController.createExperience);

router
  .route('/:id')
  .get(validateObjectId, ExperienceController.getExperienceById)
  .put(validateObjectId, validate(experienceSchema), ExperienceController.updateExperience)
  .delete(validateObjectId, ExperienceController.deleteExperience);

export default router;
