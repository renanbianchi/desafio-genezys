type getCEPServiceResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export const getCEPService = async (
  cep: string,
): Promise<getCEPServiceResponse> => {
  const formattedCEP = cep.trim().replace('-', '');

  const response = await fetch(
    `https://viacep.com.br/ws/${formattedCEP}/json/`,
  );
  const data = await response.json();

  return data;
};
