import React, { useEffect, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import omit from 'lodash.omit';
import { useLogoutMutation } from '@@/services/auth';
import { useGetMeQuery, usePatchUserMutation } from '@@/services/user';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Signature from '@@/components/Signature';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import StandardInput from '@@/components/Inputs/StandardInput';
import PhonePickerInput from '@@/components/Inputs/PhonePickerInput';

export const schema = yup
  .object({
    firstName: yup.string().required('Veuillez entrer votre prénom'),
    lastName: yup.string().required('Veuillez entrer votre nom'),
    email: yup
      .string()
      .email('Veuillez entrer un email valide')
      .required('Veuillez entrer votre email'),
    phone: yup.string().required('Veuillez entrer votre numéro de téléphone'),
    address: yup.string(),
    city: yup.string(),
    postcode: yup.string(),
    country: yup.string(),
    signature: yup.string(),
  })
  .required();

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postcode?: string;
  country?: string;
  signature?: string;
};

const MePage: React.FC = () => {
  const { data: me } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const [patchUser, { isSuccess }] = usePatchUserMutation();
  const [signature, setSignature] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    (data: Partial<SH.User>) => {
      patchUser(data);
    },
    [patchUser],
  );

  const button = useMemo(() => {
    return (
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="my-6 bg-cyan-400 rounded-lg p-2"
      >
        <span className="text-white ml-1">Valider</span>
      </button>
    );
  }, [handleSubmit, onSubmit, isSubmitting]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Vos modifications sont prises en compte`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (me) {
      const data = omit(me, [
        'role',
        '_id',
        'isDeleted',
        'createdAt',
        'updatedAt',
        'signatureDocumentId',
        'photoDocumentId',
      ]);

      reset(data);
      setSignature(me.signatureDocumentId || null);
    }
  }, [me, reset, setSignature]);

  const SignatureBlock = useMemo(() => {
    if (!me?.id) {
      return null;
    }

    if (signature) {
      return (
        <div>
          <AuthenticatedImage
            documentId={signature}
            alt="signature"
            className="border border-gray-200 w-[300px] h-[200px]"
          />
          <button
            type="button"
            onClick={() => {
              setSignature(null);
            }}
            className="my-2 bg-cyan-400 rounded-lg p-2"
          >
            <span className="text-white ml-1">Refaire votre signature</span>
          </button>
        </div>
      );
    }

    return <Signature id={me.id} />;
  }, [me?.id, signature, setSignature]);

  return (
    <div className="relative m-4 mt-10 w-full">
      <div className="fixed z-10 right-6">{button}</div>

      <form className="grid grid-cols-3 gap-12">
        <StandardInput
          register={register}
          id="firstName"
          label="Prénom (*)"
          type="text"
          placeholder="Prénom (*)"
          error={errors.firstName}
        />
        <StandardInput
          register={register}
          id="lastName"
          label="Nom (*)"
          type="text"
          placeholder="Nom (*)"
          error={errors.lastName}
        />
        <StandardInput
          register={register}
          id="email"
          label="Email (*)"
          type="text"
          placeholder="Email (*)"
          error={errors.email}
        />
        <PhonePickerInput
          control={control}
          id="phone"
          error={errors.phone}
          label="Téléphone (*)"
        />
        <StandardInput
          register={register}
          id="address"
          label="Adresse"
          type="text"
          placeholder="Adresse"
          error={errors.address}
        />
        <StandardInput
          register={register}
          id="postcode"
          label="Code postal"
          type="text"
          placeholder="Code postal"
          error={errors.postcode}
        />
        <StandardInput
          register={register}
          id="city"
          label="Ville"
          type="text"
          placeholder="Ville"
          error={errors.city}
        />
        <StandardInput
          register={register}
          id="country"
          label="Pays"
          type="text"
          placeholder="Pays"
          error={errors.country}
        />
      </form>

      <div className="mt-12">
        <p className="font-main text-main">Signature : </p>
        {SignatureBlock}
      </div>

      <button
        onClick={() => logout()}
        className="p-2 rounded-lg bg-gray-500 mt-4 block ml-auto"
      >
        <p className="font-main text-white">Déconnexion</p>
      </button>

      <div className="h-10" />
    </div>
  );
};

export default MePage;
