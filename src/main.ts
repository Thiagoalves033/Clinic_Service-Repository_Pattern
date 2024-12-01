import { getDatabasePool } from '@database/database.pool';
import { errorHandler } from '@libs/middlewares';
import dotenv from 'dotenv';
import express from 'express';
import { initTutorModule } from './modules/tutor';
import Server from './server';

dotenv.config();
const app = express();

(async () => {
  const dbPool = await getDatabasePool();
  const tutorModule = await initTutorModule(dbPool);

  app.use(express.json());
  app.use('/tutor', tutorModule);
  app.use(errorHandler);
})();

const port = process.env.PORT || 3000;

const server = new Server(app, port);
server.start();
