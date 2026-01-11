import { BaseRepository } from './BaseRepository';
import ProjectModel, { IProject } from '../models/Project.model';

/**
 * Project Repository
 * Extends BaseRepository with custom queries for Projects
 */
class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(ProjectModel);
  }

  /**
   * Get featured projects
   */
  async getFeaturedProjects(): Promise<IProject[]> {
    return await this.findAll({ featured: true });
  }

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category: string): Promise<IProject[]> {
    return await this.findAll({ category });
  }

  /**
   * Get projects by technology
   */
  async getProjectsByTechnology(technology: string): Promise<IProject[]> {
    return await this.model
      .find({ technologies: { $in: [new RegExp(technology, 'i')] } })
      .sort({ date: -1 })
      .exec();
  }

  /**
   * Search projects by title or description
   */
  async searchProjects(query: string): Promise<IProject[]> {
    const regex = new RegExp(query, 'i');
    return await this.model
      .find({
        $or: [{ title: regex }, { description: regex }],
      })
      .sort({ date: -1 })
      .exec();
  }
}

export default new ProjectRepository();
