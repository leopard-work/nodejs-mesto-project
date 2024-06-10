import { Router } from 'express';
import {
  getThisUser,
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
} from '../contollers/users';
import {
  userIdValidate,
  userUpdateAvatarValidate,
  userUpdateValidate,
} from '../ middlewares/validate';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getThisUser);
usersRouter.get('/:userId', userIdValidate, getUser);
usersRouter.patch('/me', userUpdateValidate, updateUser);
usersRouter.patch('/me/avatar', userUpdateAvatarValidate, updateUserAvatar);

export default usersRouter;
