import { BaseRepository } from './BaseRepository';
import ExperienceModel, { IExperience } from '../models/Experience.model';

/**
 * Experience Repository
 * Extends BaseRepository with custom queries for Experience
 */
class ExperienceRepository extends BaseRepository<IExperience> {
  constructor() {
    super(ExperienceModel);
  }

  /**
   * Get current experiences
   */
  async getCurrentExperiences(): Promise<IExperience[]> {
    return await this.findAll({ current: true });
  }

  /**
   * Get experiences by date range
   */
  async getExperiencesByDateRange(startDate: Date, endDate: Date): Promise<IExperience[]> {
    return await this.model
      .find({
        startDate: { $lte: endDate },
        $or: [{ endDate: { $gte: startDate } }, { current: true }],
      })
      .sort({ startDate: -1 })
      .exec();
  }

  /**
   * Get experiences by company
   */
  async getExperiencesByCompany(company: string): Promise<IExperience[]> {
    return await this.findAll({ company: new RegExp(company, 'i') });
  }
}

export default new ExperienceRepository();
