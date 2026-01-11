import { BaseRepository } from './BaseRepository';
import ProfileModel, { IProfile } from '../models/Profile.model';

/**
 * Profile Repository
 * Implements Singleton pattern - only one profile should exist
 */
class ProfileRepository extends BaseRepository<IProfile> {
  constructor() {
    super(ProfileModel);
  }

  /**
   * Get the main profile (should be only one)
   */
  async getProfile(): Promise<IProfile | null> {
    const profiles = await this.findAll();
    return profiles.length > 0 ? profiles[0] : null;
  }

  /**
   * Update or create profile (Upsert pattern)
   */
  async upsertProfile(data: Partial<IProfile>): Promise<IProfile> {
    const existingProfile = await this.getProfile();
    
    if (existingProfile) {
      return (await this.update(existingProfile._id.toString(), data)) as IProfile;
    }
    
    return await this.create(data);
  }
}

export default new ProfileRepository();
