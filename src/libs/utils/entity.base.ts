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

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(): void {
    this.updatedAt = new Date(Date.now());
  }

  public getProps(): EntityProps | BaseEntityProps {
    const props = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props
    };

    return props;
  }

  public static isEntity(entity: unknown): entity is BaseEntity<unknown> {
    return entity instanceof BaseEntity;
  }

  public equals(object?: BaseEntity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (!BaseEntity.isEntity(object)) {
      return false;
    }

    if (JSON.stringify(this.props) === JSON.stringify(object.props)) {
      return true;
    }

    return false;
  }
}
