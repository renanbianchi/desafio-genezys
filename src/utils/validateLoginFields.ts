import { Dispatch, SetStateAction } from 'react';
import { Error } from '@/pages/cadastro';

type Data = {
  email: string;
  password: string;
};

export const validateLoginFields = (
  data: Data,
  setErrors: Dispatch<SetStateAction<Error[]>>,
) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  if (!data.email) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu email',
        field: 'email',
      },
    ]);
  }

  if (!emailRegex.test(data.email)) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Insira um e-mail válido',
        field: 'email',
      },
    ]);
  }

  if (!data.password) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite uma senha válida',
        field: 'password',
      },
    ]);
  }

  if (data.password.length < 8) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'A senha precisa ter no mínimo 8 caracteres',
        field: 'password',
      },
    ]);
  }
};
