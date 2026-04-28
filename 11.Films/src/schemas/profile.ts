import { z } from 'zod';

export const ProfileSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  surName: z.string(),
  avatar: z.string(),
  // user: relation to User
  userId: z.number(),
  created_at: z.date(),
});

export type Profile = z.infer<typeof ProfileSchema>;
