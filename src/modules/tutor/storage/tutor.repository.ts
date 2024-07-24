import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { TutorEntity } from '@modules/tutor/domain/tutor.entity';
import { DatabasePool } from 'slonik';
import z from 'zod';

export const tutorSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(70),
  phone_number: z.string().min(1).max(15),
  email: z.string().min(1).max(256).email(),
  date_of_birth: z.date(),
  zip_code: z.string().min(1).max(15)
});

export class TutorRepository extends SqlRepositoryBase<TutorEntity> {
  protected tableName = 'tutors';
  protected schema = tutorSchema;

  constructor(pool: DatabasePool) {
    super(pool);
  }
}
