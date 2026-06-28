import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address').trim().toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export default RegisterSchema;
