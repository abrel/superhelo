import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '@@/services/user';
import { useForm, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StandardInput from '@@/components/Inputs/StandardInput';
import PhonePickerInput from '@@/components/Inputs/PhonePickerInput';
import NavBar from '@@/components/NavBar';

type SimpleRegisterInputType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const schema = yup
  .object({
    firstName: yup.string().trim().required('Veuillez entrer votre prénom'),
    lastName: yup.string().trim().required('Veuillez entrer votre nom'),
    phone: yup.string().required('Veuillez entrer votre numéro de téléphone'),
    email: yup
      .string()
      .email('Veuillez entrer un identifiant valide')
      .required('Veuillez entrer votre email'),
    password: yup
      .string()
      .min(6, 'Votre mot de passe doit contenir au moins 6 caractères')
      .required('Veuillez entrer votre mot de passe'),
  })
  .required();

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [createUser, { isSuccess }] = useCreateUserMutation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SimpleRegisterInputType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    async (data: SimpleRegisterInputType) => {
      return createUser(data);
    },
    [createUser],
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success('Votre compte a été créé avec succès');
      reset({ phone: '+33' });

      navigate('/dashboard');
    }
  }, [reset, isSuccess, navigate]);

  return (
    <div className="font-main bg-[url('/start-bg.png')] pb-20 sm:h-screen">
      <NavBar />

      <form className="mx-10 sm:mx-auto bg-gray-100 sm:w-[800px] p-6 sm:p-10 rounded-xl space-y-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <StandardInput
            register={register}
            id="firstName"
            label="Prénom *"
            type="text"
            placeholder="Votre prénom"
            error={errors.firstName}
          />

          <StandardInput
            register={register}
            id="lastName"
            label="Nom *"
            type="text"
            placeholder="Votre nom"
            error={errors.lastName}
          />

          <StandardInput
            register={register}
            id="email"
            label="Email *"
            type="text"
            placeholder="Votre email"
            error={errors.email}
          />

          <PhonePickerInput
            control={control}
            id="phone"
            error={errors.phone as FieldError}
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

        <p className="mt-6 mx-8 font-main text-sm text-center">
          En créant mon compte, j'accepte&nbsp;
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

        <button
          className="mx-auto block w-fit p-3 bg-cyan-500 rounded-xl"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <p className="text-lg text-white">Créer mon compte</p>
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
