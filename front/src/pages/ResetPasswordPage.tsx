import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResetPasswordMutation } from '@@/services/auth';
import StandardInput from '@@/components/Inputs/StandardInput';

const schema = yup
  .object({
    email: yup.string().email().required('Veuillez entrer votre email'),
  })
  .required();

const ResetPasswordPage: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [resetPassword, { isSuccess }] = useResetPasswordMutation();

  const onSubmit = useCallback(
    (data: { email: string }) => {
      resetPassword(data);
    },
    [resetPassword],
  );

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success(
        'Un email de réinitialisation de mot de passe vous a été envoyé',
      );
    }
  }, [isSuccess, reset]);

  return (
    <div className="m-6 w-[500px] h-screen">
      <p className="font-main text-main mb-10">
        Pour réinitialiser votre mot de passe, indiquez votre email
      </p>
      <StandardInput
        register={register}
        id="username"
        label="Email (*)"
        placeholder="Email"
        error={errors?.email}
        type="text"
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

export default ResetPasswordPage;
