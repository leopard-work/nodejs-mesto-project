import { NextFunction, Request, Response } from 'express';
import usersRouter from './users';
import cardsRouter from './cards';
import NotFoundError from '../errors/not-found';

const router = require('express').Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError({ message: 'Запрашиваемый ресурс не найден' }));
});

export default router;
