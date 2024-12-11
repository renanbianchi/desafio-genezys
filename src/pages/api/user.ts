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

export default function user(req: NextApiRequest, res: NextApiResponse<Data>) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    res.status(200).json({
      message: 'success',
      data: { id: decoded.id, email: decoded.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
