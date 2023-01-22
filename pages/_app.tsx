import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from '../utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextComponentType } from 'next';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
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
