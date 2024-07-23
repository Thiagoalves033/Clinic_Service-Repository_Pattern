export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: string;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity<EntityProps> {
  protected abstract id: string;
  protected readonly props: EntityProps;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor({ id, createdAt, updatedAt, props }: CreateEntityProps<EntityProps>) {
    const now = new Date();
    this.setId(id);
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
    this.props = props;
  }

  private setId(id: string): void {
    this.id = id;
  }
}
