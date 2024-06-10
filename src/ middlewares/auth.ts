import UnauthorizedError from '../errors/unauthorized-error';

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    return next(new UnauthorizedError({ message: 'Вы не авторизованы' }));
  }
  req.user = payload;

  next();
};

export default auth;
