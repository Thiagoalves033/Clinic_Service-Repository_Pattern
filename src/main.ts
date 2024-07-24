import dotenv from 'dotenv';
dotenv.config();

import Server from './server';
import express, { Express } from 'express';
import { setupTutorRoute } from './modules/tutor/tutor.routes';
import { errorHandler } from '@libs/middlewares';

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
