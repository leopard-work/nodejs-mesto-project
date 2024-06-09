import path from 'path';
import usersRouter from './users';
import cardsRouter from './cards';
import NotFoundError from '../errors/not-found';

const router = require('express').Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// TODO frontend build
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
});

router.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'Запрашиваемый ресурс не найден' }));
});

export default router;
