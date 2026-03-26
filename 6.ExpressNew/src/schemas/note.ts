import * as z from 'zod';
// import { ZodError } from 'zod';

const validTags = ['TS', 'JS', 'Node'];

export const NoteSchemaDTO = z.object({
  content: z.string(),
  owner: z.string().optional(),
  tags: z.array(z.enum(validTags)).optional(),
});

export const NoteSchema = NoteSchemaDTO.extend({
  id: z.uuid(),
});

export type Note = z.infer<typeof NoteSchema>;

export type NoteDTO = z.infer<typeof NoteSchemaDTO>;

// DTO
// export type NoteDTO = Omit<Note, 'id'>;
