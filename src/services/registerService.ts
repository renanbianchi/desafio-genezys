import { FormData } from '@/pages/cadastro';

export const postRegisterUser = async (data: FormData) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
};
