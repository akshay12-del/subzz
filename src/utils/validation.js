import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required').max(50, 'Username too long'),
    // Allow any length for password in mock login, but ensure it's provided
    password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const transactionSchema = z.object({
    amount: z.number().min(1, 'Amount must be at least 1').max(100000, 'Amount limit exceeded'),
    description: z.string().max(100, 'Description too long').optional(),
});

// Helper validation function
export const validateInput = (schema, data) => {
    try {
        return { success: true, data: schema.parse(data) };
    } catch (error) {
        return { success: false, error: error.errors[0].message };
    }
};
