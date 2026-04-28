import { z } from 'zod';
import { ProfileSchema } from './profile.ts';
import { ReviewSchema } from './review.ts';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  profile: z.lazy(() => ProfileSchema).optional(),
  reviews: z.array(z.lazy(() => ReviewSchema)),
  created_at: z.date(),
});

export type User = z.infer<typeof UserSchema>;
