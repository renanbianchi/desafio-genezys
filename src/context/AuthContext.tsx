import { getUserData, postUserAuthenticate } from '@/services/authService';
import { jwtDecode } from 'jwt-decode';
import router from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type SignInCredentials = {
  email: string;
  password: string;
};

export type UserData = {
  id: string;
  email: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: UserData;
  isLoading: boolean;
  fetchUserData: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData>({} as UserData);
  const [userStatus, setUserStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = useCallback((token: string): boolean => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }, []);

  const signOut = useCallback(() => {
    setIsLoading(true);

    localStorage.removeItem('genezys-auth');

    setUserStatus(false);
    setIsLoading(false);
  }, []);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('genezys-auth');
      if (!token || !validateToken(token)) {
        setIsLoading(false);
        signOut();
        return;
      }

      const response = await getUserData(token);
      console.log({ response });

      if (response.data && response.token) {
        setUser({
          id: response.data.id,
          email: response.data.email,
        });

        if (validateToken(response.token)) {
          setUserStatus(true);
        }

        localStorage.setItem('genezys-auth', response.token);
      } else {
        signOut();
      }
    } catch (e) {
      console.error(e);
      setUserStatus(false);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [validateToken, signOut]);

  useEffect(() => {
    const token = localStorage.getItem('genezys-auth');
    if (token && validateToken(token)) {
      fetchUserData();
    } else {
      setUserStatus(false);
      setIsLoading(false);
    }
  }, [fetchUserData, validateToken]);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setIsLoading(true);
      try {
        const { data } = await postUserAuthenticate({
          email,
          password,
        });

        console.log({ data });

        localStorage.setItem('genezys-auth', data.token);

        setUser({
          id: data.id,
          email: data.email,
        });
      } catch (error) {
        console.error('SignIn failed:', error);
        setUser({
          id: '',
          email: '',
        });
        router.push('/');
      }

      await fetchUserData();

      setUserStatus(true);
    },
    [fetchUserData],
  );

  const providerValues = useMemo(
    () => ({
      signIn,
      signOut,
      isAuthenticated: userStatus,
      user,
      isLoading,
      fetchUserData,
    }),
    [signIn, signOut, userStatus, isLoading, user, fetchUserData],
  );

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
};

export { AuthProvider, useAuth };
