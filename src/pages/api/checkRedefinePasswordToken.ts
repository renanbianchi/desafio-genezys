import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  userId?: string;
};

export default async function CheckredefinePasswordToken(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No email provided' });
  }

  const decryptedToken = jwt.verify(token, process.env.JWT_SECRET as string);

  console.log({ decryptedToken });

  try {
    //aqui consultariamos no banco de dados o número da requisição do usuário e caso positivo, retornariamos o ID ou Email dele.

    const userId = crypto.randomUUID();

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    res.status(200).json({ message: 'success', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
