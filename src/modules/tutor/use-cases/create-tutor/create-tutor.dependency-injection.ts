import { getDatabasePool } from '../../../../../database/database.pool';
import { TutorRepository } from '../../storage/tutor.repository';
import { CreateTutorHttpController } from './create-tutor.controller';
import { CreateTutorService } from './create-tutor.service';

export async function initializeCreateTutorController() {
  const pool = await getDatabasePool();
  const tutorRepo = new TutorRepository(pool);
  const createTutorService = new CreateTutorService(tutorRepo);
  return new CreateTutorHttpController(createTutorService);
}
