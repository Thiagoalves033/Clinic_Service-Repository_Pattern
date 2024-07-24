import { ConflictException } from '@libs/exceptions';
import { RepositoryPort } from '@libs/ports/repository.port';
import { BaseEntity } from '@libs/utils/entity.base';
import {
  DatabasePool,
  IdentifierSqlToken,
  UniqueIntegrityConstraintViolationError,
  sql
} from 'slonik';
import { ZodObject } from 'zod';

export abstract class SqlRepositoryBase<Entity extends BaseEntity<any>>
  implements RepositoryPort<Entity>
{
  protected abstract tableName: string;
  protected abstract schema: ZodObject<any>;

  protected constructor(private readonly pool: DatabasePool) {}

  async insert(entity: Entity): Promise<void> {
    const propertyNames: IdentifierSqlToken[] = [];
    const values: any = [];

    const entries = Object.entries(entity).flatMap(([key, value]) => {
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        return Object.entries(value).map(([propKey, propValue]) => [propKey, propValue]);
      }

      return [[key, value]];
    });

    entries.forEach((entry) => {
      if (entry[0] && entry[1] !== undefined) {
        propertyNames.push(sql.identifier([entry[0]]));

        if (entry[1] instanceof Date) {
          values.push(sql.timestamp(entry[1]));
        } else {
          values.push(sql.literalValue(entry[1]));
        }
      }
    });

    const query = sql.type(this.schema)`INSERT INTO ${sql.identifier([this.tableName])} 
      (${sql.join(propertyNames, sql.fragment`, `)}) VALUES 
      (${sql.join(values, sql.fragment`, `)})`;

    try {
      await this.pool.query(query);
    } catch (error) {
      if (error instanceof UniqueIntegrityConstraintViolationError) {
        throw new ConflictException('Record already exists', error);
      }

      throw error;
    }
  }

  async findOneById(id: string): Promise<Entity | null> {
    const query = sql.type(
      this.schema
    )`SELECT * FROM ${sql.identifier([this.tableName])} WHERE id = ${id}`;

    const result = await this.pool.query(query);
    return result.rows[0] ? (result.rows[0] as Entity) : null;
  }

  async findAll(): Promise<Entity[]> {
    const query = sql.type(this.schema)`SELECT * FROM ${sql.identifier([this.tableName])}`;

    const result = await this.pool.query(query);
    return result.rows as Entity[];
  }

  async deleteById(id: string): Promise<void> {
    const query = sql.type(
      this.schema
    )`DELETE * FROM ${sql.identifier([this.tableName])} WHERE id = ${id}`;

    await this.pool.query(query);
  }
}
