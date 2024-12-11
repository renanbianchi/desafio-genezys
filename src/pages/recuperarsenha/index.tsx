import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postUserRecoveryPassword } from '@/services/authService';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { Error } from '../cadastro';

type userData = {
  email: string;
};

export default function RecoverPassword() {
  const [data, setData] = useState<userData>({ email: '' });
  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmitForm = async () => {
    setErrors([]);

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    if (!data.email || !emailRegex.test(data.email)) {
      setErrors((prev) => [
        ...prev,
        {
          message: 'Insira um e-mail válido',
          field: 'email',
        },
      ]);
      return;
    }

    try {
      const response = await postUserRecoveryPassword(data.email);

      if (response.message === 'success') {
        setData({ email: '' });
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-svh m-auto gap-6 sm:text-left w-[320px] sm:w-[384px]">
      <Image
        className="pointer-events-none"
        width={250}
        height={54}
        src="/images/logo.png"
        alt="Genezys Logo"
      />
      <span className=" text-center sm:text-left text-sm text-slate-400">
        Informe seu email e enviaremos um link para recuperação da sua senha.
      </span>
      <Input
        errorMessage={errors.find((e) => e.field === 'email')?.message}
        description="Escreva o seu endereço de email"
        label="Email"
        placeholder="exemplo@dominio.com"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <Button
          onClick={handleSubmitForm}
          className="bg-black text-white px-4 py-2 rounded m-auto mt-5"
        >
          Enviar link de recuperação
        </Button>
        <Link className="underline m-auto mt-[10px]" href="/">
          Voltar ao Login
        </Link>
      </div>
    </div>
  );
}
