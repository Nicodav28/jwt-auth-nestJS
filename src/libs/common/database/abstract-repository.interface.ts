export interface AbstractRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  findByEmail(email: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
