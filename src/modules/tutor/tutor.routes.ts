import { Router } from 'express';
import { initializeCreateTutorController } from './use-cases/create-tutor/create-tutor.dependency-injection';

export async function setupTutorRoute() {
  const tutorRouter = Router();
  const createTutorController = await initializeCreateTutorController();

  tutorRouter.route('/create').post(createTutorController.handle);

  return tutorRouter;
}
