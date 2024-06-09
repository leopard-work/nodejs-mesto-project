import { Schema, model } from 'mongoose';
import validator from 'validator';

export type IUser = {
  __v: number;
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<IUser>(
  {
    __v: { type: Number, select: false },
    name: {
      type: String,
      required: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Имя" - 2'],
      maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
    },
    about: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Описание" - 2'],
      maxlength: [200, 'Максимальная длина поля "Описание" - 200'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле "Аватар" должно быть заполнено'],
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Ссылка для аватара некорректная',
      },
    },
  },
  { versionKey: false },
);

export default model<IUser>('user', userSchema);
