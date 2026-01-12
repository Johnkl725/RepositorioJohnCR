import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { validate, validateObjectId, projectSchema } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router
  .route('/')
  .get(ProjectController.getAllProjects)
  .post(authenticateToken, validate(projectSchema), ProjectController.createProject);

router
  .route('/:id')
  .get(validateObjectId, ProjectController.getProjectById)
  .put(authenticateToken, validateObjectId, validate(projectSchema), ProjectController.updateProject)
  .delete(authenticateToken, validateObjectId, ProjectController.deleteProject);

export default router;
