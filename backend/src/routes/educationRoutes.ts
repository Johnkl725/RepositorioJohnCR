import { Router } from 'express';
import EducationController from '../controllers/EducationController';
import { validate, validateObjectId, educationSchema } from '../middlewares/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(EducationController.getAllEducation)
  .post(validate(educationSchema), EducationController.createEducation);

router
  .route('/:id')
  .get(validateObjectId, EducationController.getEducationById)
  .put(validateObjectId, validate(educationSchema), EducationController.updateEducation)
  .delete(validateObjectId, EducationController.deleteEducation);

export default router;
