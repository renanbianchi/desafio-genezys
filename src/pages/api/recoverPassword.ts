import { sendEmail } from '@/services/emailService';
import { recoverEmailPasswordMessage } from '@/utils/recoverEmailPasswordMessage';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message?: string;
  requisitionId?: string;
};

export default async function recoverPassword(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ message: 'Unauthorized: No email provided' });
  }

  try {
    //aqui consultariamos no banco de dados o usuário com o email retornariamos o ID dele, verificaríamos em um possível Redis se o mesmo ja possui uma requisição pendente, e só assim usariamos um serviço de disparo de email de recuperação de senha.

    const userId = crypto.randomUUID();

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    const recoverEmailToken = jwt.sign({ email, id: userId }, secret, {
      expiresIn: '12h',
    });

    sendEmail(
      email,
      'Recuperação de senha',
      recoverEmailPasswordMessage(recoverEmailToken),
    );

    res
      .status(200)
      .json({ message: 'success', requisitionId: crypto.randomUUID() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
