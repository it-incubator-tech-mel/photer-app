import { z } from 'zod';

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  recaptchaValue: z.string(),
});

export type FormSchemaType = z.infer<typeof ForgotPasswordFormSchema>;
