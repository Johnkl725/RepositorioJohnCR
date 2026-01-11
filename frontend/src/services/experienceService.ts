import { apiClient } from './api';
import { Experience, ApiResponse } from '../types';

/**
 * Experience Service
 */

export const experienceService = {
  async getAllExperiences(current?: boolean): Promise<Experience[]> {
    const params = current !== undefined ? { current } : {};
    const response = await apiClient.get<ApiResponse<Experience[]>>('/experience', { params });
    return response.data.data!;
  },

  async getExperienceById(id: string): Promise<Experience> {
    const response = await apiClient.get<ApiResponse<Experience>>(`/experience/${id}`);
    return response.data.data!;
  },

  async createExperience(data: Partial<Experience>): Promise<Experience> {
    const response = await apiClient.post<ApiResponse<Experience>>('/experience', data);
    return response.data.data!;
  },

  async updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
    const response = await apiClient.put<ApiResponse<Experience>>(`/experience/${id}`, data);
    return response.data.data!;
  },

  async deleteExperience(id: string): Promise<void> {
    await apiClient.delete(`/experience/${id}`);
  },
};
