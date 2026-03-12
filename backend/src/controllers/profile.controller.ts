import { Request, Response, NextFunction } from 'express';
import { getProfile } from '../services/profile.service';

export const getProfileController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as any).userId;
        const user = await getProfile(userId);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
