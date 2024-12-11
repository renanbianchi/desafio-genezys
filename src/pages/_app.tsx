import { NavBar } from '@/components/shared/navBar';
import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AlertProvider } from '@/context/AlertContext';
import TemporaryAlert from '@/components/ui/temporary-alert';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '300', '400', '700', '900'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <div className={`${inter.variable}`}>
        <AlertProvider>
          <TemporaryAlert />
          <Component {...pageProps} />
        </AlertProvider>
      </div>
    </AuthProvider>
  );
}
