import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '@@/store';
import { useLoginMutation } from '@@/services/auth';
import StandardInput from '@@/components/Inputs/StandardInput';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Veuillez entrer un email valide')
      .required('Veuillez entrer votre email'),
    password: yup.string().required('Veuillez entrer votre mot de passe'),
  })
  .required();

const SigninPage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SH.SigninInput>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const navigate = useNavigate();
  const [login, { isSuccess }] = useLoginMutation();

  const loginHandler = useCallback(
    async (data: SH.SigninInput) => {
      return login(data);
    },
    [login],
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate('/home');
    }
  }, [isSuccess, navigate, reset]);

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/home');
    }
  }, [auth.accessToken, navigate]);

  return (
    <div className="flex flex-col justify-center items-center bg-cyan-400 h-screen">
      <img src="/logo.svg" className="h-16 mb-4 sm:mb-6" />
      <div className="relative p-4 sm:p-10 pb-4 w-[300px] rounded-xl flex flex-col bg-white opacity-90 sm:w-[600px]">
        <form autoComplete="off">
          <p className="font-main text-xl sm:text-2xl text-main text-center mb-8 sm:mb-12">
            Accès Mandataire
          </p>
          <div className="flex flex-col space-y-10 sm:space-y-12">
            <StandardInput
              register={register}
              id="email"
              label="Identifiant *"
              type="text"
              placeholder="Votre identifiant"
              error={errors.email}
            />
            <StandardInput
              register={register}
              id="password"
              label="Mot de passe *"
              type="password"
              placeholder="Votre mot de passe"
              error={errors.password}
            />
          </div>
        </form>
        <button
          type="button"
          className="font-main text-base bg-cyan-400 p-3 mt-6 sm:mt-10"
          onClick={handleSubmit(loginHandler)}
          disabled={isSubmitting}
        >
          <span className="text-white">Se connecter</span>
        </button>
        <Link
          to="/reset-password"
          className="mt-2 text-center font-main text-main text-sm underline italic"
        >
          Mot de passe oublié ?
        </Link>
        <p className="mt-6 font-main text-sm text-center">
          En utilisant l'application SUPERHELO, j'accepte&nbsp;
          <a
            href="https://d3rewoipwrxv4w.cloudfront.net/SuperHelo_CGUV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-main underline italic"
          >
            les conditions générales d'utilisation
          </a>
          &nbsp;ainsi que&nbsp;
          <a
            href="https://d3rewoipwrxv4w.cloudfront.net/Politique_de_Confidentialite_SuperHelo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-main underline italic"
          >
            la politique de confidentialité
          </a>
        </p>

        <div className="mt-4 sm:mt-8 font-main text-center">
          <p className="text-sm">Pas encore de compte ?</p>
          <Link
            to="/register"
            className="mt-2 text-center text-sm underline italic"
          >
            Créer mon compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
