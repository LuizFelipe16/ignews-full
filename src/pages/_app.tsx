import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.scss';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <ToastContainer icon={false} theme="dark" />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;