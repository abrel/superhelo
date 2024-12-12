import React, { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import omit from 'lodash.omit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUserQuery, usePatchUserMutation } from '@@/services/user';
import { useViewDocumentQuery } from '@@/services/document';
import {
  selectInputGenders,
  selectInputMaritalStatuses,
} from '@@/constants/user';
import { selectInputMeasureTypes } from '@@/constants/measure';
import WardForm, { schema, WardFormType } from '@@/components/Forms/WardForm';
import DocumentSection from '@@/components/DocumentSection';
import BridgeSection from '@@/components/BridgeSection';

const WardDashboardPage: React.FC<{ wardId: string }> = ({ wardId }) => {
  const { data: ward } = useGetUserQuery(wardId, {
    skip: !wardId,
  });

  const { data: photoUrl } = useViewDocumentQuery(ward?.photoDocumentId || '', {
    skip: !ward?.photoDocumentId,
  });

  const [patchUser, { isSuccess }] = usePatchUserMutation();

  const form = useForm<WardFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    (data: Partial<WardFormType>) => {
      patchUser({
        ...data,
        gender: data.gender.id,
        maritalStatus: data.maritalStatus.id,
        measures: data.measures?.map((m: any) => ({
          ...m,
          type: m.type.id,
        })),
        photo:
          typeof data.photo !== 'string' && data.photo?.length
            ? data.photo[0]
            : undefined,
      });
    },
    [patchUser],
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Le protégé a bien été modifié`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (ward) {
      const data = omit(ward, [
        'role',
        '_id',
        'guardianId',
        'photoDocumentId',
        'isDeleted',
        'createdAt',
        'updatedAt',
      ]);

      form.reset({
        ...data,
        photo: photoUrl,
        gender: selectInputGenders.find((g) => g.id === data.gender),
        maritalStatus: selectInputMaritalStatuses.find(
          (g) => g.id === data.maritalStatus,
        ),
        measures: data.measures?.map((m: SH.Measure) => ({
          ...m,
          type: selectInputMeasureTypes.find((t) => t.id === m.type),
        })),
      });
    }
  }, [ward, form.reset, photoUrl]);

  if (!ward) {
    return null;
  }

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

      <div className="m-4">
        <WardForm form={form} isNew={false} />

        <BridgeSection userId={ward.id} />

        <DocumentSection userId={ward.id} />
      </div>
    </div>
  );
};

export default WardDashboardPage;
