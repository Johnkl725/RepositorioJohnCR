import EducationRepository from '../repositories/EducationRepository';
import { IEducation } from '../models/Education.model';

/**
 * Education Service
 */
class EducationService {
  async getAllEducation(): Promise<IEducation[]> {
    return await EducationRepository.findAll();
  }

  async getEducationById(id: string): Promise<IEducation | null> {
    const education = await EducationRepository.findById(id);
    if (!education) {
      throw new Error('Education entry not found');
    }
    return education;
  }

  async getCurrentEducation(): Promise<IEducation[]> {
    return await EducationRepository.getCurrentEducation();
  }

  async createEducation(data: Partial<IEducation>): Promise<IEducation> {
    // Validate dates
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      throw new Error('End date cannot be before start date');
    }

    if (data.current) {
      data.endDate = undefined;
    }

    return await EducationRepository.create(data);
  }

  async updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation> {
    await this.getEducationById(id);

    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      throw new Error('End date cannot be before start date');
    }

    if (data.current) {
      data.endDate = undefined;
    }

    const updated = await EducationRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update education');
    }

    return updated;
  }

  async deleteEducation(id: string): Promise<void> {
    const deleted = await EducationRepository.delete(id);
    if (!deleted) {
      throw new Error('Education entry not found or already deleted');
    }
  }
}

export default new EducationService();
