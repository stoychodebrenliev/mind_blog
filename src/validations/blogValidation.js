import { z } from 'zod';

export const blogSchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 characters long')
        .max(50, 'Title must be maximum 50 characters long'),

    image: z
        .string()
        .regex(/^https?:\/\//, 'Image must start with http:// or https://'),

    content: z
        .string()
        .min(10, 'Content must be at least 10 characters long'),

    category: z
        .string()
        .min(3, 'Category must be at least 3 characters long')
});