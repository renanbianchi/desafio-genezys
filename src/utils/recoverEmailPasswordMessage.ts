export const recoverEmailPasswordMessage = (token: string) => {
  return `
    Clique no link abaixo para recuperar sua senha: ${process.env.NEXT_PUBLIC_URL}/redefinirsenha?t=${token}
  `;
};
