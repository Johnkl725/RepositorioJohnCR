import { BaseRepository } from './BaseRepository';
import EducationModel, { IEducation } from '../models/Education.model';

/**
 * Education Repository
 */
class EducationRepository extends BaseRepository<IEducation> {
  constructor() {
    super(EducationModel);
  }

  /**
   * Get current education
   */
  async getCurrentEducation(): Promise<IEducation[]> {
    return await this.findAll({ current: true });
  }
}

export default new EducationRepository();
