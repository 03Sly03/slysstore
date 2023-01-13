import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const submitHandler: SubmitHandler<FormValues> = ({ email, password }) => {
    console.log(email, password);
  };
  return (
    <Layout title="connexion">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Connexion</h1>
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
              required: 'Veuillez entrer un mot de passe',
              minLength: { value: 6, message: 'Mot de passe trop court' },
            })}
            type="password"
            id="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Se connecter</button>
        </div>
      </form>
      <div className="mb-4">
        Vous n'avez pas de compte chez nous ?&nbsp;
        <Link href="register">S'enregistrer</Link>
      </div>
    </Layout>
  );
}

export default LoginScreen;
