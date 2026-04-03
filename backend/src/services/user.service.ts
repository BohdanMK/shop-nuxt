import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { User, UserDocument } from '../models/User';

const createHttpError = (message: string, statusCode: number): Error & { statusCode: number } => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

export interface GetUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'admin' | 'user' | 'moderator';
  sortBy?: 'createdAt' | 'name' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedUsers {
  items: Omit<UserDocument, 'password'>[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserPayload {
  name: string;
  userName: string;
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserPayload {
  name?: string;
  userName?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user' | 'moderator';
}

const userFields = '-password';

export const getUsers = async (options: GetUsersOptions = {}): Promise<PaginatedUsers> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;

  const filter: Record<string, unknown> = {};

  if (options.search) {
    filter.$or = [
      { name: { $regex: options.search, $options: 'i' } },
      { userName: { $regex: options.search, $options: 'i' } },
      { email: { $regex: options.search, $options: 'i' } },
    ];
  }

  if (options.role) {
    filter.role = options.role;
  }

  const sortField = options.sortBy ?? 'createdAt';
  const sortDirection = options.sortOrder === 'asc' ? 1 : -1;

  const [items, total] = await Promise.all([
    User.find(filter, userFields).sort({ [sortField]: sortDirection }).skip((page - 1) * limit).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getUserById = async (userId: string): Promise<UserDocument> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw createHttpError('Invalid user id', 400);
  }

  const user = await User.findById(userId, userFields).lean();

  if (!user) {
    throw createHttpError('User not found', 404);
  }

  return user;
};

export const createUser = async (data: CreateUserPayload): Promise<UserDocument> => {
  const { name, userName, email, password, role } = data;

  if (!name || !userName || !email || !password) {
    throw createHttpError('name, userName, email and password are required', 400);
  }

  const existing = await User.findOne({ $or: [{ email }, { userName }] });
  if (existing) {
    throw createHttpError('User with this email or userName already exists', 409);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, userName, email, password: hashed, role });

  const { password: _pw, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword as unknown as UserDocument;
};

export const updateUser = async (userId: string, data: UpdateUserPayload): Promise<UserDocument> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw createHttpError('Invalid user id', 400);
  }

  if (!Object.keys(data).length) {
    throw createHttpError('At least one field is required to update user', 400);
  }

  const updateData: Record<string, unknown> = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(userId, updateData, { new: true, projection: userFields }).lean();

  if (!user) {
    throw createHttpError('User not found', 404);
  }

  return user;
};

export const deleteUser = async (userId: string): Promise<UserDocument> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw createHttpError('Invalid user id', 400);
  }

  const user = await User.findByIdAndDelete(userId, { projection: userFields }).lean();

  if (!user) {
    throw createHttpError('User not found', 404);
  }

  return user;
};
