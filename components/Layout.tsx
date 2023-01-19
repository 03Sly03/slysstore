import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { ProductQuantity, Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: Props) {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state!;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce(
        (a: number, c: ProductQuantity) => a + c.quantity,
        0
      )
    );
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + " - Sly's Store" : "Sly's Store"}</title>
        <meta name="description" content="ECommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              Sly's Store
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Panier
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link className="p-2" href="/login">
                  Se connecter
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Sly's Store</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
