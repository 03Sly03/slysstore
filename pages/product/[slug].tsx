import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Produit non trouvé</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Retour</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Categorie: {product.category}</li>
            <li>Marque: {product.brand}</li>
            <li>
              {product.rating} pour {product.numReviews} votes
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Prix</div>
              <div>{product.price}€</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? 'En stock' : 'Non disponible'}
              </div>
            </div>
            <button className="primary-button w-full">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;