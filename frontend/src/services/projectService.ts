import { apiClient } from './api';
import { Project, ApiResponse } from '../types';

/**
 * Project Service
 */

export const projectService = {
  async getAllProjects(featured?: boolean, category?: string): Promise<Project[]> {
    const params: any = {};
    if (featured !== undefined) params.featured = featured;
    if (category) params.category = category;
    
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects', { params });
    return response.data.data!;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data!;
  },

  async searchProjects(query: string): Promise<Project[]> {
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects', {
      params: { search: query },
    });
    return response.data.data!;
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return response.data.data!;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data!;
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  },
};
