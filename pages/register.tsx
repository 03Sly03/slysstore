import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect }: any = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const submitHandler: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
  }) => {
    // console.log(email, password);
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        name,
        email,
        password,
      });
      if (result!.error) {
        toast.error(result?.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Créer un compte">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Créer un compte</h1>

        <div className="mb-4">
          <label htmlFor="name">Nom</label>
          <input
            {...register('name', {
              required: 'Entrez votre nom',
            })}
            type="text"
            id="name"
            className="w-full"
            autoFocus
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
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Mot de passe</label>
          <input
            {...register('password', {
              required: 'Veuillez entrer un mot de passe',
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
              required: 'Veuillez confirmer le mot de passe',
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
          <button className="primary-button">S'enregistrer</button>
        </div>
        <div className="mb-4">
          Vous avez déjà un compte chez nous ?&nbsp;
          <Link
            className="text-blue-600 hover:text-blue-800"
            href={`/login?redirect=${redirect || '/'}`}
          >
            Se connecter
          </Link>
        </div>
      </form>
    </Layout>
  );
}

export default LoginScreen;
