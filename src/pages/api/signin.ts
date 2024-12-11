import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type Data = {
  message?: string;
  data?: {
    id: string;
    email: string;
  };
  token?: string;
};

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { email, password } = await req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: No email or password provided' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    //aqui consultariamos no banco de dados o usuário com o email e senha e retornariamos o ID dele, mas vamos só retornar o email e a senha.

    const userId = crypto.randomUUID();

    const encoded = jwt.sign({ email, password, id: userId }, secret, {
      expiresIn: '12h',
    });

    res.status(200).json({
      message: 'success',
      data: { id: userId, email },
      token: encoded,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
