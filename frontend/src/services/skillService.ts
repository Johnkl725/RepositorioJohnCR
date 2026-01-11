import { apiClient } from './api';
import { Skill, SkillsGrouped, ApiResponse } from '../types';

export const skillService = {
  async getAllSkills(category?: string): Promise<Skill[]> {
    const params = category ? { category } : {};
    const response = await apiClient.get<ApiResponse<Skill[]>>('/skills', { params });
    return response.data.data!;
  },

  async getSkillsGrouped(): Promise<SkillsGrouped> {
    const response = await apiClient.get<ApiResponse<SkillsGrouped>>('/skills', {
      params: { grouped: true },
    });
    return response.data.data!;
  },
};
