import { errorHandler } from '@libs/middlewares';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { setupTutorRoute } from './modules/tutor/tutor.routes';
import Server from './server';

dotenv.config();

const app: Express = express();

(async () => {
  const tutorRoute = await setupTutorRoute();

  app.use(express.json());
  app.use('/', tutorRoute);
  app.use(errorHandler);
})();

const port = process.env.PORT || 3000;

const server = new Server(app, port);
server.start();
