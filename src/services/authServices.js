import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userRepository from '../repositories/userRepository.js';

const SALT_ROUNDS = 10;

function generateAuthToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

export async function register(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        SALT_ROUNDS
    );

    const createdUser = await userRepository.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    });

    return generateAuthToken(createdUser);
}

export async function login(userData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    return generateAuthToken(user);
}

const authService = {
    register,
    login
};

export default authService;