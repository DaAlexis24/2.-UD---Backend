import * as z from 'zod';
// import { ZodError } from 'zod';

const validTags = ['TS', 'JS', 'Node'];

export const NoteSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  owner: z.string().optional(),
  tags: z.array(z.enum(validTags)).optional(),
});

export const NoteSchemaDTO = NoteSchema.omit({
  id: true,
});

export type Note = z.infer<typeof NoteSchema>;

export type NoteDTO = z.infer<typeof NoteSchemaDTO>;

// DTO
// export type NoteDTO = Omit<Note, 'id'>;

export type NoteUpdate = Partial<NoteDTO>;
