import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

type FormValues = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  location: object;
};

function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const { state, dispatch } = useContext(Store);
  const { cart } = state!;
  const { shippingAddress }: any = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler: SubmitHandler<FormValues> = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }) => {
    dispatch!({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country, location },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Adresse d'expédition">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Addresse d'expédition</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Nom complet</label>
          <input
            type="text"
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', { required: 'Entrez un nom complet' })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Entrez une adresse',
              minLength: {
                value: 3,
                message: "L'adresse doit comporter plus de deux caractères",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            className="w-full"
            id="city"
            {...register('city', {
              required: "Entrez le nom d'une ville",
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Code postale</label>
          <input
            type="text"
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: "Entrez le nom d'une ville",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Pays</label>
          <input
            type="text"
            className="w-full"
            id="country"
            {...register('country', {
              required: "Entrez le nom d'un pays",
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Suivant</button>
        </div>
      </form>
    </Layout>
  );
}

export default ShippingScreen;

ShippingScreen.auth = true;
