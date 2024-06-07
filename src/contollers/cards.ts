import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request';
import NotFoundError from '../errors/not-found';
import ForbiddenError from '../errors/forbidden-error';

const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  // @ts-ignore
  const owner = req.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => {
      throw new BadRequestError('Некорректные данные');
    })
    .catch(next);
};

const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки не существует');
      }
      // @ts-ignore
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Ошибка прав доступа');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((cardInfo) => {
          res.send(cardInfo);
        })
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const owner = req.user._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки не существует');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректные данные');
      }
    })
    .catch(next);
};

const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const owner = req.user._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки не существует');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректные данные');
      }
    })
    .catch(next);
};

export { getCards, createCard, deleteCard, likeCard, dislikeCard };
