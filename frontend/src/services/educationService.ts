import { apiClient } from './api';
import { Education, ApiResponse } from '../types';

export const educationService = {
  async getAllEducation(): Promise<Education[]> {
    const response = await apiClient.get<ApiResponse<Education[]>>('/education');
    return response.data.data!;
  },
};
