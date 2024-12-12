type userData = {
  id: string;
  email: string;
  password: string;
};

type PasswordData = {
  userId: string;
  password: string;
  verifyPassword: string;
};

type postUserAuthenticateResponse = {
  message?: string;
  data?: Partial<userData>;
  token?: string;
};

type getUserDataResponse = postUserAuthenticateResponse;

type postUserRecoveryPasswordResponse = {
  message?: string;
  requisitionId?: string;
};

type postCheckRedefinePasswordTokenResponse = postUserRecoveryPasswordResponse;

type postRedefinePasswordResponse = postUserRecoveryPasswordResponse;

export const postUserAuthenticate = async ({
  email,
  password,
}: userData): Promise<postUserAuthenticateResponse> => {
  if (!email || !password) throw new Error('No user or email found');

  const response = await fetch('/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response.json();
};

export const getUserData = async (
  token: string,
): Promise<getUserDataResponse> => {
  const response = await fetch('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const postUserRecoveryPassword = async (
  email: string,
): Promise<postUserRecoveryPasswordResponse> => {
  const response = await fetch('/api/recoverPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return response.json();
};

export const postCheckRedefinePasswordToken = async (
  token: string,
): Promise<postCheckRedefinePasswordTokenResponse> => {
  const response = await fetch('/api/checkRedefinePasswordToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
    }),
  });
  return response.json();
};

export const postRedefinePassword = async (
  data: PasswordData,
): Promise<postRedefinePasswordResponse> => {
  const response = await fetch('/api/redefinePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: data.userId,
      password: data.password,
      verifyPassword: data.verifyPassword,
    }),
  });
  return response.json();
};
