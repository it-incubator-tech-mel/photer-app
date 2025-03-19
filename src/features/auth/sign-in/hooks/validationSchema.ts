import { z } from 'zod';

export const logInSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'The password must contain at least 6 characters')
    .max(20, 'The password must not exceed 20 characters'),
});

export type LogInSchema = z.infer<typeof logInSchema>;
