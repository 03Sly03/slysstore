import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { ProductQuantity, Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: Props) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state!;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce(
        (a: number, c: ProductQuantity) => a + c.quantity!,
        0
      )
    );
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    if (dispatch) dispatch({ type: 'CART_RESET', payload: cart.cartItems[0] });
    signOut({ callbackUrl: '/login' });
  };
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
              <Link
                href="/cart"
                className="p-2 text-blue-600 hover:text-blue-800"
              >
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
                <div className="relative inline-block">
                  <Menu as="div">
                    <Menu.Button className="text-blue-500">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="bg-white absolute right-0 w-56 origin-top-right shadow-lg">
                      <Menu.Item>
                        <div>
                          <DropdownLink href="/profile">Profile</DropdownLink>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div>
                          <DropdownLink href="/order-history">
                            Historique des commandes
                          </DropdownLink>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        <div>
                          <Link
                            className="dropdown-link"
                            href="#"
                            onClick={logoutClickHandler}
                          >
                            Se déconnecter
                          </Link>
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              ) : (
                <Link
                  className="p-2 text-blue-600 hover:text-blue-800"
                  href="/login"
                >
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
