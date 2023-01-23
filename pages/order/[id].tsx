import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Reducer, useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

const reducer: Reducer<any, any> = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
};

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Commande ${orderId}`}>
      <h1>{`Commande ${orderId}`}</h1>
      {loading ? (
        <div>Chargement...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2>Adresse d'expédition</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Livré le {deliveredAt}</div>
              ) : (
                <div className="alert-error">Non livré</div>
              )}
            </div>

            <div className="card p-5">
              <h2>Méthode de paiement</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">payé le {paidAt}</div>
              ) : (
                <div className="alert-error">Non payé</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Articles commandés</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Article</th>
                    <th className="px-5 text-right">Quantité</th>
                    <th className="px-5 text-right">Price</th>
                    <th className="px-5 text-right">Sous-total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item: any) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.price} €</td>
                      <td className="p-5 text-right">
                        {item.price * item.quantity} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Récapitulatif de la commande</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Articles</div>
                    <div>{itemsPrice} €</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>TVA</div>
                    <div>{taxPrice} €</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Frais de port</div>
                    <div>{shippingPrice} €</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>{totalPrice} €</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default OrderScreen;

OrderScreen.auth = true;
