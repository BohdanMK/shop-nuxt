import { Request, Response, NextFunction } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../services/user.service';

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const search = req.query.search as string | undefined;
    const role = req.query.role as 'admin' | 'user' | 'moderator' | undefined;
    console.log('Get Users Query:', { page, limit, search, role });
    const result = await getUsers({
      page,
      limit,
      ...(search !== undefined && { search }),
      ...(role !== undefined && { role }),
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await updateUser(userId, {
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await deleteUser(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
