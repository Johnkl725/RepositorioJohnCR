import { apiClient } from './api';
import { Profile, ApiResponse } from '../types';

/**
 * Profile Service
 * Handles all profile-related API calls
 */

export const profileService = {
  async getProfile(): Promise<Profile> {
    const response = await apiClient.get<ApiResponse<Profile>>('/profile');
    return response.data.data!;
  },

  async updateProfile(data: Partial<Profile>): Promise<Profile> {
    const response = await apiClient.put<ApiResponse<Profile>>('/profile', data);
    return response.data.data!;
  },
};
