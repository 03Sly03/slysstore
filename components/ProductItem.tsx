/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ProductData } from '../src/types/datas';

type Props = {
  product: ProductData;
};

function ProductItem({ product }: Props) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price}€</p>
        <button className="primary-button" type="button">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
