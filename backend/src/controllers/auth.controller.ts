import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/auth.service';

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};