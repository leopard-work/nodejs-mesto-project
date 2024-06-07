import usersRouter from './users';
import cardsRouter from './cards';

const router = require('express').Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
