import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller';

const router = Router();

router.get('/', authMiddleware, getUsersController);
router.get('/admin', authMiddleware, getUsersController);
router.get('/:userId', authMiddleware, getUserByIdController);
router.post('/admin/create', authMiddleware, createUserController);
router.patch('/admin/:userId/update', authMiddleware, updateUserController);
router.delete('/admin/:userId/delete', authMiddleware, deleteUserController);

export default router;
