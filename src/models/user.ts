import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import UnauthorizedError from '../errors/unauthorized-error';

export type IUser = {
  __v: number;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

export type UserModel = mongoose.Model<IUser> & {
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<mongoose.Document<unknown, any, IUser>>;
};

const userSchema = new Schema<IUser, UserModel>(
  {
    __v: { type: Number, select: false },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "Имя" - 2'],
      maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля "Описание" - 2'],
      maxlength: [200, 'Максимальная длина поля "Описание" - 200'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Ссылка для аватара некорректная',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: 'Email некорректный',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError({
            message: 'Почта или пароль введены неверно',
          }),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError({
              message: 'Почта или пароль введены неверно',
            }),
          );
        }
        return user;
      });
    });
};

export default model<IUser, UserModel>('user', userSchema);
