import { inputFields } from '@/components/signin/InputFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { validateLoginFields } from '@/utils/validateLoginFields';

import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import { ChangeEvent, useState } from 'react';

import { Error } from './cadastro';
import { postUserAuthenticate } from '@/services/authService';
import { useAlertContext } from '@/context/AlertContext';

type userData = {
  email: string;
  password: string;
};

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    Router.push('/dashboard');
  }

  const [data, setData] = useState<userData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Error[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();

  const findErrorMessage = (field: string) => {
    return errors.find((e) => e.field === field)?.message;
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    validateLoginFields(data, setErrors);

    if (errors.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await postUserAuthenticate({
        email: data.email,
        password: data.password,
      });

      console.log({ response });

      if (response.message === 'success') {
        showAlert('success', 'Login efetuado com sucesso!');
        localStorage.setItem('genezys-auth', response.token);
        Router.push('/dashboard');
      }
    } catch (error) {
      showAlert(
        'error',
        'Ocorreu um erro. Por favor, tente novamente mais tarde.',
      );
      console.error(error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const updateField = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setData({ ...data, [field]: e.target.value });

    setErrors((prevErrors) =>
      prevErrors.map((error) =>
        error.field === field ? { ...error, message: '' } : error,
      ),
    );
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-svh m-auto gap-[62px]`}
    >
      <Image
        className="pointer-events-none"
        width={250}
        height={54}
        src="/images/logo.png"
        alt="Genezys Logo"
      />

      <div className="flex flex-col items-center justify-center gap-6 w-[320px] sm:w-[384px]">
        {inputFields.map((field, index) => (
          <Input
            key={index}
            label={field.label}
            type={field.type}
            errorMessage={findErrorMessage(field.input)}
            placeholder={field.placeholder}
            onChange={(e) => updateField(e, field.input)}
          />
        ))}

        <div className="flex flex-col items-center justify-center gap-3">
          <Button disabled={isLoading} onClick={handleSubmitForm}>
            Acessar conta
          </Button>

          <Link href="/cadastro">
            <Button disabled={isLoading} variant={'outline'}>
              Criar conta
            </Button>
          </Link>
        </div>

        <Link className="underline m-auto mt-[10px]" href="/recuperarsenha">
          Recuperar senha
        </Link>
      </div>
    </div>
  );
}
