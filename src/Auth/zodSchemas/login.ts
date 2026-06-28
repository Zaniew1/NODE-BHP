import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address').trim().toLowerCase(),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export default LoginSchema;
