import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { validate, validateObjectId, projectSchema } from '../middlewares/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(ProjectController.getAllProjects)
  .post(validate(projectSchema), ProjectController.createProject);

router
  .route('/:id')
  .get(validateObjectId, ProjectController.getProjectById)
  .put(validateObjectId, validate(projectSchema), ProjectController.updateProject)
  .delete(validateObjectId, ProjectController.deleteProject);

export default router;
