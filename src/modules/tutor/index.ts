import { Router } from 'express';
import { DatabasePool } from 'slonik';
import { TutorRepository } from './storage/tutor.repository';
import { initCreateTutorController } from './use-cases/create-tutor/create-tutor.injection';

export async function initTutorModule(pool: DatabasePool) {
  const tutorRouter = Router();
  const tutorRepo = new TutorRepository(pool);

  const createTutorController = await initCreateTutorController(pool, tutorRepo);

  tutorRouter.route('/create').post(createTutorController.handle);

  return tutorRouter;
}
