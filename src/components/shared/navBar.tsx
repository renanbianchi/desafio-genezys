import { useAuth } from '@/context/AuthContext';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Loading } from '../ui/loading';

export const NavBar = () => {
  const { isAuthenticated, signOut, isLoading, fetchUserData } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, [router.asPath, fetchUserData]);

  const location = router.asPath;

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setMenuOpen(false);
      signOut();
      return;
    }

    setMenuOpen(false);
    router.push('/');
  };

  if (isLoading)
    return (
      <div className="items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div
      className={`flex flex-row ${menuOpen && isAuthenticated ? 'justify-center h-[320px]' : menuOpen ? 'justify-center h-[140px]' : 'justify-between h-[60px]'} p-4 sticky top-0 w-full z-10 bg-white sm:items-center sm:h-auto transition-[height] ease-in-out duration-700 overflow-hidden`}
    >
      <Image
        className={`absolute top-4 sm:top-0 left-4 pointer-events-none w-28 sm:w-[250px] sm:relative sm:h-[54px] transition-[opacity]`}
        width={250}
        height={54}
        src="/images/logo.png"
        alt="Genezys Logo"
      />
      <div
        className={`gap-6 items-center ${menuOpen ? 'flex flex-col mt-8' : 'hidden'} sm:flex`}
      >
        {isAuthenticated && (
          <>
            <Link
              className={`${location === '/dashboard' && 'cursor-default'}`}
              onClick={(e) => location === '/dashboard' && e.preventDefault()}
              href="/dashboard"
            >
              <Button
                disabled={location === '/dashboard'}
                variant={location === '/dashboard' ? 'secondary' : 'default'}
              >
                Home
              </Button>
            </Link>
            <Button className="hover:cursor-not-allowed" variant="ghost">
              Perfil
            </Button>
            <Button className="hover:cursor-not-allowed" variant="ghost">
              Configurações
            </Button>
          </>
        )}
        <Link href="https://genezys.io/#footer">
          <Button variant="ghost">Ajuda</Button>
        </Link>

        {location !== '/' && (
          <Button variant="ghost" onClick={handleButtonClick}>
            {isAuthenticated ? 'Logoff' : 'Login'}
          </Button>
        )}
      </div>
      <Menu
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden absolute top-4 right-4"
      />
    </div>
  );
};
