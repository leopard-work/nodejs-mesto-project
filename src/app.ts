import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import path from 'path';
import helmet from 'helmet';
import router from './routes';
import { errorHandler } from './errors/error-handler';
import types from './types';
import auth from './ middlewares/auth';
import { createUser, loginUser } from './contollers/users';
import { requestLogger, errorLogger } from './ middlewares/logger';
import { userLoginValidate } from './ middlewares/validate';

const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

const startServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(requestLogger);

  // TODO frontend build
  app.use(express.static(path.join(__dirname, 'public', 'build')));
  app.use(express.static('public'));

  app.use(cookieParser());
  app.post('/signup', userLoginValidate, createUser);
  app.post('/signin', userLoginValidate, loginUser);
  app.use(auth);
  app.use(router);
  app.use(helmet());
  app.use(errorLogger);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  startServer();
});
