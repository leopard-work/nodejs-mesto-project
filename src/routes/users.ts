import { Router } from 'express';
import {
  getThisUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} from '../contollers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getThisUser);
usersRouter.get('/:userId', getUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
