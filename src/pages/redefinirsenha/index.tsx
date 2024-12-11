import { inputFields } from '@/components/recover-password/InputFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import {
  postCheckRedefinePasswordToken,
  postRedefinePassword,
} from '@/services/authService';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Error } from '../cadastro';
import { useAlertContext } from '@/context/AlertContext';

type userData = {
  userId: string;
  password: string;
  verifyPassword: string;
};

export default function RedefinePassword() {
  const router = useRouter();
  const { token } = router.query;
  const [showInputFields, setShowInputFields] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();
  const [data, setData] = useState<userData>({
    userId: '',
    password: '',
    verifyPassword: '',
  });

  const updateField = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setData({ ...data, [field]: e.target.value });

    setErrors((prevErrors) =>
      prevErrors.map((error) =>
        error.field === field ? { ...error, message: '' } : error,
      ),
    );
  };

  const findErrorMessage = (field: string) => {
    return errors.find((e) => e.field === field)?.message;
  };

  useEffect(() => {
    if (!token) {
      Router.push('/');
      return;
    }

    const fetchTokenResponse = async () => {
      const response = await postCheckRedefinePasswordToken(token as string);

      if (response.userId && response.message === 'success') {
        setData({ ...data, userId: response.userId });
        setShowInputFields(true);
      }
    };

    try {
      fetchTokenResponse();
    } catch (err) {
      console.error('Invalid token:', err);
      Router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSubmitForm = async () => {
    setIsLoading(true);
    if (!data.password || !data.verifyPassword) {
      setErrors((prev) => [
        ...prev,
        {
          message: 'Preencha ambos os campos',
          field: 'password',
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (data.password.length < 8) {
      setErrors((prev) => [
        ...prev,
        {
          message: 'A senha precisa ter no mínimo 8 caracteres',
          field: 'password',
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (data.password !== data.verifyPassword) {
      setErrors((prev) => [
        ...prev,
        {
          message: 'As senhas não coincidem',
          field: 'password',
        },
      ]);
      setIsLoading(false);
      return;
    }

    if (errors.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await postRedefinePassword({
        userId: data.userId,
        password: data.password,
        verifyPassword: data.verifyPassword,
      });

      if (response.message === 'success') {
        showAlert('success', 'Senha redefinida com sucesso!');
        Router.push('/');
      }
    } catch (error) {
      showAlert(
        'error',
        'Ocorreu um erro. Por favor, tente novamente mais tarde.',
      );
      console.error(error);
    }

    setIsLoading(false);
  };

  if (!showInputFields) {
    return (
      <div className="flex flex-col items-center justify-center h-svh m-auto gap-[62px]">
        <Loading />
        <span className="text-sm text-slate-400">
          Estamos validando a sua requisição...
        </span>
      </div>
    );
  }

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
            Redefinir Senha
          </Button>
        </div>
      </div>
    </div>
  );
}
