import { Request, Response, NextFunction } from 'express';
import ExperienceService from '../services/ExperienceService';
import { asyncHandler, AppError } from '../middlewares/errorHandler';

/**
 * Experience Controller
 * Handles HTTP requests for Experience endpoints
 */
class ExperienceController {
  /**
   * Get all experiences
   * GET /api/experience
   */
  getAllExperiences = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { current } = req.query;

    let experiences;
    if (current === 'true') {
      experiences = await ExperienceService.getCurrentExperiences();
    } else {
      experiences = await ExperienceService.getAllExperiences();
    }

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      data: experiences,
    });
  });

  /**
   * Get single experience
   * GET /api/experience/:id
   */
  getExperienceById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const experience = await ExperienceService.getExperienceById(id);

    res.status(200).json({
      status: 'success',
      data: experience,
    });
  });

  /**
   * Create new experience
   * POST /api/experience
   */
  createExperience = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const experience = await ExperienceService.createExperience(req.body);

    res.status(201).json({
      status: 'success',
      data: experience,
    });
  });

  /**
   * Update experience
   * PUT /api/experience/:id
   */
  updateExperience = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const experience = await ExperienceService.updateExperience(id, req.body);

    res.status(200).json({
      status: 'success',
      data: experience,
    });
  });

  /**
   * Delete experience
   * DELETE /api/experience/:id
   */
  deleteExperience = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await ExperienceService.deleteExperience(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export default new ExperienceController();
