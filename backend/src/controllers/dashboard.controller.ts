import { Request, Response, NextFunction } from 'express';
import { getDashboardInfo } from '../services/dashboard.service';

export const getDashboardInfoController = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await getDashboardInfo();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};
