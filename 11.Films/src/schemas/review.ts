import { z } from 'zod';

export const ReviewSchema = z.object({
  userId: z.number(),
  movieId: z.number(),
  text: z.string(),
  // user: relation to User
  // movie: relation to Movie
  created: z.date(),
});

export type Review = z.infer<typeof ReviewSchema>;
