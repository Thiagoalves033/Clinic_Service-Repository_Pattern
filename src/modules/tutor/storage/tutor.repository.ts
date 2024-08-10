import { ConflictException } from '@src/libs/exceptions';
import { TutorEntity } from '@modules/tutor/domain/tutor.entity';
import {
  DatabasePool,
  IdentifierSqlToken,
  UniqueIntegrityConstraintViolationError,
  sql
} from 'slonik';
import z from 'zod';
import { TutorMapper } from '../tutor.mapper';
import { ITutorRepository } from './tutor.repository.port';

export const tutorSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(70),
  date_of_birth: z.date(),
  email: z.string().min(1).max(256).email(),
  phone_number: z.string().min(1).max(15),
  state: z.string().min(2).max(30),
  city: z.string().min(2).max(30),
  zip_code: z.string().min(1).max(15)
});

export type TutorModel = z.TypeOf<typeof tutorSchema>;

export class TutorRepository implements ITutorRepository {
  protected tableName = 'tutors';
  protected schema = tutorSchema;
  protected mapper = new TutorMapper();
  private readonly pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async insertTutor(tutor: TutorEntity): Promise<void> {
    const mappedTutor = this.mapper.toPersistence(tutor);

    const propertyNames: IdentifierSqlToken[] = [];
    const values: any = [];

    const entries = Object.entries(mappedTutor).flatMap(([key, value]) => {
      if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
        return Object.entries(value).map(([propKey, propValue]) => [propKey, propValue]);
      }

      return [[key, value]];
    });
    console.log(entries);
    entries.forEach((entry) => {
      if (entry[0] && entry[1] !== undefined) {
        propertyNames.push(sql.identifier([entry[0] as string]));

        if (entry[1] instanceof Date) {
          values.push(sql.timestamp(entry[1]));
        } else {
          values.push(sql.literalValue(entry[1] as string));
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
}
