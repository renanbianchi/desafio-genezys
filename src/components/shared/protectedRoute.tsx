import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { Loading } from '../ui/loading';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex-1 justify-center items-center">
        <Loading />
      </div>
    );
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
