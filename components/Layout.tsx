import React from 'react';
import Head from 'next/head';

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

      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}

export default Layout;
