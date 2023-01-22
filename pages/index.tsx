import axios from 'axios';
import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import { ProductData } from '../src/types/datas';
// import data from '../utils/data';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }: { products: ProductData[] }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state!;

  const addToCartHandler = async (product: ProductData) => {
    const exisItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = exisItem ? exisItem.quantity! + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert("Désolé. Il n'y a plus de stock");
      return;
    }

    dispatch!({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <Layout title="Page d'accueil">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
