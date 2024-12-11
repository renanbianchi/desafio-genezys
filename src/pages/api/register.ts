/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';

type InputRegisterForm = {
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

export default function register(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    email,
    password,
    verifyPassword,
    cep,
    city,
    state,
    street,
    neighborhood,
    number,
    complement,
  }: InputRegisterForm = req.body;

  const requiredFields = {
    name,
    email,
    password,
    verifyPassword,
    cep,
    city,
    state,
    street,
    neighborhood,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(401).json({
      message: `Necessary fields are empty: ${missingFields.join(', ')}`,
    });
  }

  try {
    //Aqui consultariamos se o usuario ja tem registro, fariamos as validações dos campos (regra de negócios no backend) e registraríamos o usuário com todos os campos no db e retornariamos o ID dele, mas vamos só retornar o email e a senha.

    res.status(200).json({ message: 'success', data: { email, password } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
