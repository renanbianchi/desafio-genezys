import { FormData } from '@/pages/cadastro';

type postRegisterUserResponse = {
  message?: string;
  data?: {
    email: string;
    password: string;
  };
};

export const postRegisterUser = async (
  data: FormData,
): Promise<postRegisterUserResponse> => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
};
