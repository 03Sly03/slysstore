import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  title: string;
  children: string;
};

function Layout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title ? title + " - Sly's Store" : "Sly's Store"}</title>
        <meta name="description" content="ECommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              Sly's Store
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}

export default Layout;
