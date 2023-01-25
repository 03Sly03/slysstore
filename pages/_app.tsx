import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from '../utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const SCRIPT_PROVIDER_OPTIONS = {
    'client-id': process.env.PAYPAL_CLIENT_ID || 'sb',
  };

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider
          deferLoading={true}
          // options={{ 'client-id': 'sb' }}
          options={SCRIPT_PROVIDER_OPTIONS}
        >
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

function Auth({ children }: Props) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
