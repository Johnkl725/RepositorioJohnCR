import { Router } from 'express';
import SkillController from '../controllers/SkillController';
import { validate, validateObjectId, skillSchema } from '../middlewares/validationMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router
  .route('/')
  .get(SkillController.getAllSkills)
  .post(authenticateToken, validate(skillSchema), SkillController.createSkill);

router
  .route('/:id')
  .get(validateObjectId, SkillController.getSkillById)
  .put(authenticateToken, validateObjectId, validate(skillSchema), SkillController.updateSkill)
  .delete(authenticateToken, validateObjectId, SkillController.deleteSkill);

export default router;
