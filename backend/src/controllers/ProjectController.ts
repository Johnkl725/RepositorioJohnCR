import { Request, Response, NextFunction } from 'express';
import ProjectService from '../services/ProjectService';
import { asyncHandler } from '../middlewares/errorHandler';

/**
 * Project Controller
 */
class ProjectController {
  /**
   * Get all projects
   * GET /api/projects
   */
  getAllProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { featured, category, search } = req.query;

    let projects;
    
    if (search) {
      projects = await ProjectService.searchProjects(search as string);
    } else {
      projects = await ProjectService.getAllProjects(
        featured === 'true',
        category as string
      );
    }

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects,
    });
  });

  /**
   * Get single project
   * GET /api/projects/:id
   */
  getProjectById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(id);

    res.status(200).json({
      status: 'success',
      data: project,
    });
  });

  /**
   * Create new project
   * POST /api/projects
   */
  createProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const project = await ProjectService.createProject(req.body);

    res.status(201).json({
      status: 'success',
      data: project,
    });
  });

  /**
   * Update project
   * PUT /api/projects/:id
   */
  updateProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await ProjectService.updateProject(id, req.body);

    res.status(200).json({
      status: 'success',
      data: project,
    });
  });

  /**
   * Delete project
   * DELETE /api/projects/:id
   */
  deleteProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await ProjectService.deleteProject(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export default new ProjectController();
