import { Request, Response, NextFunction } from 'express';
import EducationService from '../services/EducationService';
import { asyncHandler } from '../middlewares/errorHandler';

class EducationController {
  getAllEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { current } = req.query;

    let education;
    if (current === 'true') {
      education = await EducationService.getCurrentEducation();
    } else {
      education = await EducationService.getAllEducation();
    }

    res.status(200).json({
      status: 'success',
      results: education.length,
      data: education,
    });
  });

  getEducationById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const education = await EducationService.getEducationById(id);

    res.status(200).json({
      status: 'success',
      data: education,
    });
  });

  createEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const education = await EducationService.createEducation(req.body);

    res.status(201).json({
      status: 'success',
      data: education,
    });
  });

  updateEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const education = await EducationService.updateEducation(id, req.body);

    res.status(200).json({
      status: 'success',
      data: education,
    });
  });

  deleteEducation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await EducationService.deleteEducation(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export default new EducationController();
