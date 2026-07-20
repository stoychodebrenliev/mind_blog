import { z } from 'zod';

export const registerSchema = z.object ({
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    email: z.string().min(10, 'Email must be at least 10 characters long'),
    password: z.string().min(4, 'Password must be at least 4 characters long'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});