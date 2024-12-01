import { DatabasePool } from 'slonik';
import { TutorRepository } from '../../storage/tutor.repository';
import { CreateTutorHttpController } from './create-tutor.controller';
import { CreateTutorService } from './create-tutor.service';

export async function initCreateTutorController(pool: DatabasePool, tutorRepo: TutorRepository) {
  const createTutorService = new CreateTutorService(tutorRepo);
  return new CreateTutorHttpController(createTutorService);
}
