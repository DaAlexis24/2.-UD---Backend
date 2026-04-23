import { z } from 'zod';
import { MovieSchema } from './movie.ts';

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  movies: z.array(z.lazy(() => MovieSchema)),
  created_at: z.date(),
});

export type Genre = z.infer<typeof GenreSchema>;
