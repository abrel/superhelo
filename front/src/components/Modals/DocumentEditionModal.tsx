import React, { useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@@/store';
import {
  useGetDocumentQuery,
  usePatchDocumentMutation,
} from '@@/services/document';
import { hideDocumentEditionModal } from '@@/features/modal';

import { selectInputDocumentTypes } from '@@/constants/document';
import MultiSelectInput from '@@/components/Inputs/MultiSelectInput';
import StandardInput from '@@/components/Inputs/StandardInput';
import CheckboxInput from '@@/components/Inputs/CheckboxInput';

type DocumentEditForm = {
  label?: string;
  isPrivate?: boolean;
  type: {
    id: string;
    label: string;
  };
};

export const schema = yup
  .object({
    type: yup.object({
      id: yup.string().required(),
      label: yup.string().required(),
    }),
    label: yup.string(),
    isPrivate: yup.boolean(),
  })
  .required();

const DocumentEditionModal: React.FC<{
  documentId: string;
  onClose: () => void;
}> = ({ documentId, onClose }) => {
  const dispatch = useDispatch();
  const showDocumentEditionModal = useSelector(
    (state: RootState) => state.modal.showDocumentEditionModal,
  );
  const { data: document } = useGetDocumentQuery(documentId || '', {
    skip: !documentId || !showDocumentEditionModal,
  });

  const [patchDocument, { isSuccess }] = usePatchDocumentMutation();

  const {
    register,
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DocumentEditForm>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [type] = watch(['type']);

  const onSubmit = useCallback(
    (data: DocumentEditForm) => {
      if (documentId) {
        patchDocument({
          isPrivate: !!data.isPrivate,
          label: data.label,
          type: data.type?.id,
          documentId,
        });
      }
    },
    [patchDocument, documentId],
  );

  const closeModal = useCallback(() => {
    onClose();

    dispatch(hideDocumentEditionModal());
  }, [dispatch, onClose]);

  useEffect(() => {
    if (document?.id) {
      reset({
        label: document.label || document.name,
        type: selectInputDocumentTypes.find((d) => d.id === document.type),
        isPrivate: document.isPrivate,
      });
    }
  }, [document?.id, reset]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Le document a bien été modifié`, {
        position: 'top-right',
      });
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <Modal
      isOpen={showDocumentEditionModal}
      onRequestClose={closeModal}
      className="absolute bg-white mt-4 py-6 px-8 border border-gray-300 rounded-lg top-20 left-8 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[600px] z-90"
      contentLabel="Show document edition modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col space-y-10 py-4" key="event-form">
        <StandardInput
          register={register}
          id="label"
          label="Nom du document"
          placeholder="Nom du document"
          error={errors?.label}
          type="text"
        />

        <MultiSelectInput
          control={control}
          id="type"
          label="type de document"
          values={type}
          options={selectInputDocumentTypes}
          isMulti={false}
        />

        <CheckboxInput
          register={register}
          id="isPrivate"
          label="Rendre le document privé"
        />
      </div>

      <button
        type="button"
        className="mt-2 py-2 px-3 bg-cyan-400 text-white rounded-xl font-main text-base w-fit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <span className="ml-2">Valider</span>
      </button>
    </Modal>
  );
};

export default DocumentEditionModal;
