import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/error';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function ProfileScreen() {
  const { data: session } = useSession();
  const usersSession = session?.user!;

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setValue('name', usersSession.name);
    setValue('email', usersSession.email);
  }, [usersSession, setValue]);

  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
  }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Le profile à bien été mis à jour');
      if (result?.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Mon profile</h1>
        <div className="mb-4">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', { required: 'Entrez un nom' })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Adresse mail</label>
          <input
            {...register('email', {
              required: 'Adresse mail manquant',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Entrez une adresse mail valide',
              },
            })}
            type="email"
            id="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register('password', {
              minLength: { value: 6, message: 'Mot de passe trop court' },
            })}
            type="password"
            id="password"
            className="w-full"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password'),
              minLength: { value: 6, message: 'Mot de passe trop court' },
            })}
            type="password"
            id="confirmPassword"
            className="w-full"
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">
                Le mot de passe ne correspond pas
              </div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Enregistrer</button>
        </div>
      </form>
    </Layout>
  );
}

export default ProfileScreen;

ProfileScreen.auth = true;
