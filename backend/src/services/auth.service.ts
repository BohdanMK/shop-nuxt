import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import e from 'express';


export const loginUser = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Email and password are required');

    const user = await User.findOne({ email });

    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '3h' });
    return { token, user };
}

