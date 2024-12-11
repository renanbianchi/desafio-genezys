import { Dispatch, SetStateAction } from 'react';
import { Error } from '@/pages/cadastro';

type formData = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
};

export const validateRegisterFields = (
  formData: formData,
  setErrors: Dispatch<SetStateAction<Error[]>>,
) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  if (!formData.name) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu nome completo',
        field: 'name',
      },
    ]);
  }

  if (!formData.email) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu email',
        field: 'email',
      },
    ]);
  }

  if (!emailRegex.test(formData.email)) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Insira um e-mail válido',
        field: 'email',
      },
    ]);
  }

  if (!formData.password || !formData.verifyPassword) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite uma senha válida',
        field: 'password',
      },
    ]);
  }

  if (formData.password.length < 8) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'A senha precisa ter no mínimo 8 caracteres',
        field: 'password',
      },
    ]);
  }

  if (formData.password !== formData.verifyPassword) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'As senhas não coincidem',
        field: 'password',
      },
    ]);
  }

  if (!formData.cep) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu CEP',
        field: 'cep',
      },
    ]);
  }

  if (!formData.street) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu endereço',
        field: 'street',
      },
    ]);
  }

  if (!formData.city) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite sua cidade',
        field: 'city',
      },
    ]);
  }

  if (!formData.neighborhood) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu bairro',
        field: 'neighborhood',
      },
    ]);
  }

  if (!formData.state) {
    setErrors((prev) => [
      ...prev,
      {
        message: 'Digite seu estado',
        field: 'state',
      },
    ]);
  }
};
