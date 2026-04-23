import { z } from 'zod';
import { GenreSchema } from './genre.ts';
import { ReviewSchema } from './review.ts';

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  director: z.string(),
  duration: z.number(),
  poster: z.string().optional(),
  rate: z.number(),
  genres: z.array(z.lazy(() => GenreSchema)),
  reviews: z.array(z.lazy(() => ReviewSchema)),
  created_at: z.date(),
});

export type Movie = z.infer<typeof MovieSchema>;
