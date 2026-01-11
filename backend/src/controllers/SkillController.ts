import { Request, Response, NextFunction } from 'express';
import SkillService from '../services/SkillService';
import { asyncHandler } from '../middlewares/errorHandler';

class SkillController {
  getAllSkills = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { category, grouped } = req.query;

    let data;
    if (grouped === 'true') {
      data = await SkillService.getSkillsGrouped();
    } else {
      data = await SkillService.getAllSkills(category as string);
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  });

  getSkillById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const skill = await SkillService.getSkillById(id);

    res.status(200).json({
      status: 'success',
      data: skill,
    });
  });

  createSkill = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const skill = await SkillService.createSkill(req.body);

    res.status(201).json({
      status: 'success',
      data: skill,
    });
  });

  updateSkill = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const skill = await SkillService.updateSkill(id, req.body);

    res.status(200).json({
      status: 'success',
      data: skill,
    });
  });

  deleteSkill = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await SkillService.deleteSkill(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export default new SkillController();
