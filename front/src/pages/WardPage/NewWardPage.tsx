import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateWardMutation } from '@@/services/user';

import WardForm, { schema, WardFormType } from '@@/components/Forms/WardForm';

const NewWardPage: React.FC = () => {
  const navigate = useNavigate();

  const [createWard, { isSuccess, data: ward }] = useCreateWardMutation();
  const form = useForm<WardFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    (data: WardFormType) => {
      createWard({
        ...data,
        gender: data.gender.id,
        photo: data.photo?.length ? data.photo[0] : undefined,
      });
    },
    [createWard],
  );

  useEffect(() => {
    if (isSuccess && ward) {
      toast.success(
        `Le protégé ${ward.firstName} ${ward.lastName} a bien été créé`,
        {
          position: 'top-right',
        },
      );

      navigate(`/wards/${ward.id}`);
    }
  }, [isSuccess, ward]);

  return (
    <div>
      <div className="z-10 right-6 top-12 fixed">
        <button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          className="my-6 bg-cyan-400 rounded-lg p-2"
        >
          <span className="text-white ml-1">Valider</span>
        </button>
      </div>
      <WardForm form={form} isNew />
    </div>
  );
};

export default NewWardPage;
