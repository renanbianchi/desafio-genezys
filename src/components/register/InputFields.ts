export const inputFields = [
  {
    description: 'Escreva o seu nome completo',
    placeholder: 'Ex: João Silva',
    label: 'Nome Completo',
    input: 'name',
  },
  {
    description: 'Escreva seu email',
    placeholder: 'exemplo@dominio.com',
    label: 'Email',
    input: 'email',
  },
  {
    description: 'Sua senha deve ter 8 caracteres ou mais',
    placeholder: 'Crie uma senha',
    label: 'Senha',
    type: 'password',
    input: 'password',
  },
  {
    type: 'password',
    label: 'Confirmar senha',
    input: 'verifyPassword',
  },
  {
    label: 'CEP',
    placeholder: '00000-000',
    mask: '99999-999',
    input: 'cep',
  },
  {
    horizontal: [
      {
        label: 'Cidade',
        placeholder: 'Ex: São Paulo',
        input: 'city',
      },
      {
        label: 'Estado',
        placeholder: 'ex: SP',
        mask: 'aa',
        input: 'state',
      },
    ],
  },
  {
    label: 'Bairro',
    placeholder: 'Ex: Bela Vista',
    input: 'neighborhood',
  },
  {
    label: 'Rua',
    placeholder: 'Ex: Avenida Paulista',
    input: 'street',
  },
  {
    horizontal: [
      {
        label: 'Número',
        placeholder: '0000',
        input: 'number',
      },
      {
        label: 'Complemento',
        placeholder: 'Ex: Apartamento 101, Bloco B',
        input: 'complement',
      },
    ],
  },
];
