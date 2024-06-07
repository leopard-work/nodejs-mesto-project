import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
    return;
  }
  res.status(500).send({ message: 'Неизвестная ошибка, повторите позже' });
  next();
};

export { errorHandler };
