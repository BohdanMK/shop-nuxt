import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
	upload,
	uploadFile,
	getFileById,
	deleteFileById,
} from '../controllers/uploads.controller';

const router = Router();

router.post('/', authMiddleware, upload.single('file'), uploadFile);
router.get('/:fileId', authMiddleware, getFileById);
router.delete('/:fileId', authMiddleware, deleteFileById);

export default router;