import { BaseRepository } from './BaseRepository';
import SkillModel, { ISkill } from '../models/Skill.model';

/**
 * Skill Repository
 */
class SkillRepository extends BaseRepository<ISkill> {
  constructor() {
    super(SkillModel);
  }

  /**
   * Get skills by category
   */
  async getSkillsByCategory(category: string): Promise<ISkill[]> {
    return await this.findAll({ category });
  }

  /**
   * Get skills grouped by category
   */
  async getSkillsGroupedByCategory(): Promise<Record<string, ISkill[]>> {
    const skills = await this.findAll();
    return skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {} as Record<string, ISkill[]>);
  }
}

export default new SkillRepository();
