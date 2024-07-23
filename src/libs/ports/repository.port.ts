export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<void>;
  findOneById(id: string): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  deleteById(id: string): Promise<void>;
}
