/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  data?: {
    id: string;
    email: string;
  };
  token?: string;
};

export default async function CheckredefinePasswordToken(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { userId, password, verifyPassword } = req.body;

  if (!password || !verifyPassword) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: No password provided' });
  }

  if (password.length < 8) {
    return res.status(401).json({
      message: 'Unauthorized: Password must be at least 8 characters long',
    });
  }

  if (password !== verifyPassword) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Passwords do not match' });
  }

  try {
    //aqui consultariamos no banco de dados pelo id do usuário e caso positivo, alteraríamos a senha com o post do mesmo.

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
