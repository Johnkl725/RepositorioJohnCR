import ProfileRepository from '../repositories/ProfileRepository';
import { IProfile } from '../models/Profile.model';

/**
 * Profile Service
 */
class ProfileService {
  async getProfile(): Promise<IProfile | null> {
    return await ProfileRepository.getProfile();
  }

  async updateProfile(data: Partial<IProfile>): Promise<IProfile> {
    // Business logic: Email validation
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    return await ProfileRepository.upsertProfile(data);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }
}

export default new ProfileService();
