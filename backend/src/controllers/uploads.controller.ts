import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Types } from 'mongoose';
import { MediaObject } from '../models/MediaObject';
import { User } from '../models/User';

const uploadDir = path.resolve(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname) || '.bin';
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
        cb(null, uniqueName);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const resolveAbsoluteFilePath = (filePath: string): string =>
    path.resolve(process.cwd(), filePath);

const canAccessMedia = async (userId: string, ownerId: Types.ObjectId): Promise<boolean> => {
    if (ownerId.toString() === userId) {
        return true;
    }

    const user = await User.findById(userId).select('role');
    return user?.role === 'admin';
};

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const relativePath = path.posix.join('uploads', req.file.filename);
        const media = await MediaObject.create({
            userId: new Types.ObjectId(req.userId),
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: relativePath,
            mimeType: req.file.mimetype,
            size: req.file.size,
            storage: 'local',
            status: 'active',
        });

        const publicPath = `/${relativePath}`;

        return res.status(200).json({
            message: 'File uploaded successfully',
            userId: req.userId,
            fileId: media._id,
            fileName: media.fileName,
            filePath: publicPath,
            fileUrl: `${req.protocol}://${req.get('host')}${publicPath}`,
            mimeType: media.mimeType,
            size: media.size,
            status: media.status,
        });
    } catch (err) {
        return next(err);
    }
};

export const getFileById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fileId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!fileId || !Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: 'Invalid file id' });
        }

        const media = await MediaObject.findById(fileId);
        if (!media || media.status !== 'active') {
            return res.status(404).json({ message: 'File not found' });
        }

        const hasAccess = await canAccessMedia(userId, media.userId);
        if (!hasAccess) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const absoluteFilePath = resolveAbsoluteFilePath(media.filePath);
        if (!fs.existsSync(absoluteFilePath)) {
            return res.status(404).json({ message: 'Physical file not found' });
        }

        return res.sendFile(absoluteFilePath);
    } catch (err) {
        return next(err);
    }
};

export const deleteFileById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fileId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!fileId || !Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: 'Invalid file id' });
        }

        const media = await MediaObject.findById(fileId);
        if (!media || media.status !== 'active') {
            return res.status(404).json({ message: 'File not found' });
        }

        const hasAccess = await canAccessMedia(userId, media.userId);
        if (!hasAccess) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const absoluteFilePath = resolveAbsoluteFilePath(media.filePath);
        try {
            await fs.promises.unlink(absoluteFilePath);
        } catch (error: unknown) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }

        media.status = 'deleted';
        media.deletedAt = new Date();
        await media.save();

        return res.status(200).json({
            message: 'File deleted successfully',
            userId,
            fileId: media._id,
            status: media.status,
        });
    } catch (err) {
        return next(err);
    }
};
