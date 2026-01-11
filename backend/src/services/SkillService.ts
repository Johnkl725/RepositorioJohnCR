import SkillRepository from '../repositories/SkillRepository';
import { ISkill } from '../models/Skill.model';

/**
 * Skill Service
 */
class SkillService {
  async getAllSkills(category?: string): Promise<ISkill[]> {
    if (category) {
      return await SkillRepository.getSkillsByCategory(category);
    }
    return await SkillRepository.findAll();
  }

  async getSkillsGrouped(): Promise<Record<string, ISkill[]>> {
    return await SkillRepository.getSkillsGroupedByCategory();
  }

  async getSkillById(id: string): Promise<ISkill | null> {
    const skill = await SkillRepository.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    return skill;
  }

  async createSkill(data: Partial<ISkill>): Promise<ISkill> {
    return await SkillRepository.create(data);
  }

  async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill> {
    await this.getSkillById(id);

    const updated = await SkillRepository.update(id, data);
    if (!updated) {
      throw new Error('Failed to update skill');
    }

    return updated;
  }

  async deleteSkill(id: string): Promise<void> {
    const deleted = await SkillRepository.delete(id);
    if (!deleted) {
      throw new Error('Skill not found or already deleted');
    }
  }
}

export default new SkillService();
