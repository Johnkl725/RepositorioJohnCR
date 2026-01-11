import { Router } from 'express';
import SkillController from '../controllers/SkillController';
import { validate, validateObjectId, skillSchema } from '../middlewares/validationMiddleware';

const router = Router();

router
  .route('/')
  .get(SkillController.getAllSkills)
  .post(validate(skillSchema), SkillController.createSkill);

router
  .route('/:id')
  .get(validateObjectId, SkillController.getSkillById)
  .put(validateObjectId, validate(skillSchema), SkillController.updateSkill)
  .delete(validateObjectId, SkillController.deleteSkill);

export default router;
