interface CRUD<T extends { id: unknown }> {
  readAll: () => T[];
  readById: (id: T['id']) => T | null;
  create: (data: Omit<T, 'id'>) => T;
  update: (id: T['id'], data: Partial<Omit<T, 'id'>>) => T | null;
  delete: (id: T['id']) => boolean;
}
