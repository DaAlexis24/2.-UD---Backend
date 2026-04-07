export interface Repository<T extends WithId> {
  read: () => Promise<T[]>;
  readById: (id: T['id']) => Promise<T>; // Errores => throw Err
  search?: (q: Query<T>) => Promise<T[]>;
  create: (data: Omit<T, 'id'>) => Promise<T>;
  updateById: (id: T['id'], data: Omit<Partial<T>, 'id'>) => Promise<T>; // Errores => throw Errr
  replaceById?: (data: T) => Promise<T>; // Errores => throw Err
  deleteById: (id: T['id']) => Promise<T>; // Errores => throw Err
}

export interface WithId {
  id: string;
}

export type Query<T> = Record<keyof T, unknown>;
