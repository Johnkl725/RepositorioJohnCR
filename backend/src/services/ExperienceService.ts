import ExperienceRepository from '../repositories/ExperienceRepository';
import { IExperience } from '../models/Experience.model';

/**
 * Experience Service
 * Business logic layer for Experience operations
 * Follows Dependency Inversion Principle (depends on Repository abstraction)
 */
class ExperienceService {
  async getAllExperiences(): Promise<IExperience[]> {
    return await ExperienceRepository.findAll();
  }

  async getExperienceById(id: string): Promise<IExperience | null> {
    const experience = await ExperienceRepository.findById(id);
    if (!experience) {
      throw new Error('Experience not found');
    }
    return experience;
  }

  async getCurrentExperiences(): Promise<IExperience[]> {
    return await ExperienceRepository.getCurrentExperiences();
  }

  async createExperience(data: Partial<IExperience>): Promise<IExperience> {
    // Business logic: Validate dates
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      throw new Error('End date cannot be before start date');
    }

    // Business logic: If current is true, endDate should be null
    if (data.current) {
      data.endDate = undefined;
    }

    return await ExperienceRepository.create(data);
  }

  async updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience> {
    // Validate existence
    await this.getExperienceById(id);

    // Business logic validations
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      throw new Error('End date cannot be before start date');
    }

    if (data.current) {
      data.endDate = undefined;
    }

    const updated = await ExperienceRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update experience');
    }

    return updated;
  }

  async deleteExperience(id: string): Promise<void> {
    const deleted = await ExperienceRepository.delete(id);
    if (!deleted) {
      throw new Error('Experience not found or already deleted');
    }
  }
}

export default new ExperienceService();
