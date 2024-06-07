import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import path from 'path';
import router from './routes';
import { errorHandler } from './errors/error-handler';

const { PORT = 3000 } = process.env;

const startServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.user = {
      _id: '666346ddb4458479a5bd9dca', // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
  });

  app.use(router);
  app.use(errors());
  app.use(errorHandler);

  // TODO frontend build
  app.use(express.static(path.join(__dirname, 'public', 'build')));
  app.use(express.static('public'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  startServer();
});
