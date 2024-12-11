export const getCEPService = async (cep: string) => {
  const formattedCEP = cep.trim().replace('-', '');

  const response = await fetch(
    `https://viacep.com.br/ws/${formattedCEP}/json/`,
  );
  const data = await response.json();

  return data;
};
