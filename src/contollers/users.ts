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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный ID'));
      } else {
        next(err);
      }
    });
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  return User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(() => {
      throw new BadRequestError('Некорректные данные');
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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя не существует');
      }
      res.status(200).send(user);
    })
    .catch(() => {
      throw new BadRequestError('Некорректные данные');
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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя не существует');
      }
      res.status(200).send(user);
    })
    .catch(() => {
      throw new BadRequestError('Некорректные данные');
    })
    .catch(next);
};

export { getUsers, getUser, createUser, updateUser, updateUserAvatar };
