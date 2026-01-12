import { Router } from 'express';
import EducationController from '../controllers/EducationController';
import { validate, validateObjectId, educationSchema } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router
  .route('/')
  .get(EducationController.getAllEducation)
  .post(authenticateToken, validate(educationSchema), EducationController.createEducation);

router
  .route('/:id')
  .get(validateObjectId, EducationController.getEducationById)
  .put(authenticateToken, validateObjectId, validate(educationSchema), EducationController.updateEducation)
  .delete(authenticateToken, validateObjectId, EducationController.deleteEducation);

export default router;
