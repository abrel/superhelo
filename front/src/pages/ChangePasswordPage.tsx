import React, { useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useChangePasswordMutation } from '@@/services/auth';
import StandardInput from '@@/components/Inputs/StandardInput';

const schema = yup
  .object({
    password: yup.string().required('Veuillez entrer votre mot de passe'),
  })
  .required();

const ChangePasswordPage: React.FC = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') as string;

  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ password: string }>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();

  const onSubmit = useCallback(
    (data: { password: string }) => {
      changePassword({ ...data, token });
    },
    [changePassword],
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success('Votre mot de passe a bien été modifié');
      navigation('/signin');
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (!token) {
      navigation('/reset-password');
    }
  }, [token]);

  if (isError) {
    return (
      <div className="m-6 w-[500px h-screen]">
        <p className="text-main font-main mb-10">
          La requête a expiré. Veuillez refaire une demande de réinitialisation
          de mot de passe&nbsp;
          <Link
            to="/reset-password"
            className="text-blue-500 text-lg underline"
          >
            ici
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="m-6 w-[500px]">
      <p className="text-main font-main mb-10">
        Veuillez entrer un nouveau mot de passe
      </p>
      <StandardInput
        register={register}
        id="password"
        label="Mot de passe (*)"
        placeholder="Mot de passe"
        error={errors?.password}
        type="password"
      />

      <button
        type="button"
        className="mt-10 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base w-fit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <span className="ml-2">Valider</span>
      </button>
    </div>
  );
};

export default ChangePasswordPage;
