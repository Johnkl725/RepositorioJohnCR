import { Request, Response, NextFunction } from 'express';
import ProfileService from '../services/ProfileService';
import { asyncHandler, AppError } from '../middlewares/errorHandler';

class ProfileController {
  getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await ProfileService.getProfile();

    if (!profile) {
      return next(new AppError('Profile not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: profile,
    });
  });

  updateProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await ProfileService.updateProfile(req.body);

    res.status(200).json({
      status: 'success',
      data: profile,
    });
  });
}

export default new ProfileController();
