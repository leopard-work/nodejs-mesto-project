import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found';
import BadRequestError from '../errors/bad-request';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  return User.findOne({ _id: req.params.userId })
    .orFail(() => new NotFoundError({ message: 'Пользователя не существует' }))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Некорректные данные' }));
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    // @ts-ignore
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError({ message: 'Пользователя не существует' }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Некорректные данные' }));
      } else {
        next(err);
      }
    })
    .catch(next);
};

const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    // @ts-ignore
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError({ message: 'Пользователя не существует' }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: 'Некорректные данные' }));
      } else {
        next(err);
      }
    })
    .catch(next);
};

export { getUsers, getUser, createUser, updateUser, updateUserAvatar };
