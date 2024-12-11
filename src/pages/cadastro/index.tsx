import { inputFields } from '@/components/register/InputFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { useAlertContext } from '@/context/AlertContext';

import { postUserAuthenticate } from '@/services/authService';
import { getCEPService } from '@/services/getCEPservice';
import { postRegisterUser } from '@/services/registerService';

import { validateRegisterFields } from '@/utils/validateRegisterFields';

import Link from 'next/link';

import { ChangeEvent, useEffect, useState } from 'react';

export interface FormData {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
}

export interface Error {
  message: string;
  field: string;
}

export default function Cadastro() {
  const { showAlert } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    cep: '',
    city: '',
    state: '',
    street: '',
    neighborhood: '',
    number: '',
    complement: '',
  });

  const updateField = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
    console.log({ field });

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
    if (!formData.cep || formData.cep.length !== 9) return;

    const handleCheckCep = async (cep: string) => {
      if (!cep) return;

      try {
        const response = await getCEPService(cep);

        if (response.erro) {
          setErrors((prev) => [
            ...prev,
            {
              message: 'Digite um CEP válido',
              field: 'cep',
            },
          ]);
        }

        if (response) {
          setFormData((prev) => ({
            ...prev,
            street: response.logradouro,
            complement: response.complemento,
            city: response.localidade,
            state: response.uf,
            number: response.numero,
            neighborhood: response.bairro,
          }));

          const addressInputs = [
            'street',
            'complement',
            'city',
            'state',
            'number',
            'neighborhood',
          ];

          setErrors((prevErrors) =>
            prevErrors.map((error) =>
              addressInputs.includes(error.field)
                ? { ...error, message: '' }
                : error,
            ),
          );
        }
      } catch (error) {
        console.error('Error fetching CEP data:', error);
      }
    };

    handleCheckCep(formData.cep);
  }, [formData.cep]);

  const handleSubmitForm = async () => {
    setIsLoading(true);
    setErrors([]);

    validateRegisterFields(formData, setErrors);

    if (errors.length > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await postRegisterUser(formData);

      if (response.message === 'success') {
        setIsLoading(false);
        showAlert('success', 'Cadastro efetuado com sucesso!');

        await postUserAuthenticate({
          email: response.email,
          password: response.password,
        });
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

  return (
    <div className="flex flex-col gap-8 justify-center m-auto w-full sm:max-w-[384px] px-4 sm:px-0">
      <h1 className={`font-bold text-center text-5xl`}>Crie sua conta</h1>

      <div className="flex flex-col gap-5">
        {inputFields.map((field, index) =>
          field.horizontal ? (
            <div key={index} className="flex flex-col sm:flex-row gap-6 ">
              {field.horizontal.map((horizontalField, index) => (
                <Input
                  key={index}
                  placeholder={horizontalField.placeholder}
                  label={horizontalField.label}
                  onChange={(e) => updateField(e, horizontalField.input)}
                  errorMessage={findErrorMessage(horizontalField.input)}
                  mask={field.mask}
                  type={field.type}
                  value={formData[horizontalField.input as keyof FormData]}
                />
              ))}
            </div>
          ) : (
            <Input
              className="w-[320px] sm:w-[384px]"
              key={field.label}
              description={field.description}
              placeholder={field.placeholder}
              label={field.label}
              type={field.type}
              onChange={(e) => updateField(e, field.input)}
              errorMessage={findErrorMessage(field.input)}
              mask={field.mask}
              value={formData[field.input as keyof FormData]}
            />
          ),
        )}

        <Button
          disabled={isLoading || errors.some((error) => error.message !== '')}
          onClick={handleSubmitForm}
          className="bg-black text-white max-w-36 px-4 py-2 rounded m-auto mt-5"
        >
          {isLoading ? <Loading /> : 'Cadastrar'}
        </Button>
      </div>

      <Link className="underline m-auto mt-[-10px]" href="/">
        Voltar ao login
      </Link>
    </div>
  );
}
