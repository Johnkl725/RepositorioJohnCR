import ProjectRepository from '../repositories/ProjectRepository';
import { IProject } from '../models/Project.model';

/**
 * Project Service
 * Business logic layer for Project operations
 */
class ProjectService {
  async getAllProjects(featured?: boolean, category?: string): Promise<IProject[]> {
    if (featured) {
      return await ProjectRepository.getFeaturedProjects();
    }
    
    if (category) {
      return await ProjectRepository.getProjectsByCategory(category);
    }
    
    return await ProjectRepository.findAll();
  }

  async getProjectById(id: string): Promise<IProject | null> {
    const project = await ProjectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async searchProjects(query: string): Promise<IProject[]> {
    if (!query || query.trim().length === 0) {
      return await this.getAllProjects();
    }
    return await ProjectRepository.searchProjects(query);
  }

  async createProject(data: Partial<IProject>): Promise<IProject> {
    // Business logic: Validate technologies array
    if (!data.technologies || data.technologies.length === 0) {
      throw new Error('At least one technology is required');
    }

    return await ProjectRepository.create(data);
  }

  async updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
    // Validate existence
    await this.getProjectById(id);

    const updated = await ProjectRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update project');
    }

    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    const deleted = await ProjectRepository.delete(id);
    if (!deleted) {
      throw new Error('Project not found or already deleted');
    }
  }

  async getProjectsByTechnology(technology: string): Promise<IProject[]> {
    return await ProjectRepository.getProjectsByTechnology(technology);
  }
}

export default new ProjectService();
