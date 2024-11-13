import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoWarningOutline, IoDocumentTextOutline } from 'react-icons/io5';
import {
  MdPublic,
  MdOutlinePublicOff,
  MdOutlineModeEdit,
} from 'react-icons/md';
import {
  useGetUserDocumentsQuery,
  useCreateUserDocumentsMutation,
  useDeleteDocumentMutation,
  usePatchDocumentMutation,
} from '@@/services/document';
import { openDocumentEditionModal } from '@@/features/modal';
import { DocumentTypes, translateDocumentType } from '@@/constants/document';
import SectionTitle from '@@/components/SectionTitle';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import AuthenticatedLink from '@@/components/AuthenticatedLink';
import Loader from '@@/components/Loader';
import DocumentEditionModal from '@@/components/Modals/DocumentEditionModal';

const computeDocumentName = (document: SH.Document) => {
  const creationDate = moment(document.createdAt).format('DD/MM/YYYY');
  return `${creationDate} : ${document.label || document.name}`;
};

const Document: React.FC<{ document: SH.Document }> = ({ document }) => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [
    deleteDocument,
    { isSuccess: isDeletionSuccess, isLoading: isDeletionLoading },
  ] = useDeleteDocumentMutation();

  const onEdit = useCallback(() => {
    setIsFocused(true);
    setTimeout(() => {
      dispatch(openDocumentEditionModal());
    }, 0);
  }, [dispatch]);

  const onCloseModal = useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  const onDelete = useCallback(() => {
    if (
      document?.id &&
      confirm('Souhaitez vous vraiment supprimer ce document ?')
    ) {
      deleteDocument(document.id);
    }
  }, [deleteDocument, document?.id]);

  useEffect(() => {
    if (isDeletionSuccess) {
      toast.success(`Le document a bien été supprimé`, {
        position: 'top-right',
      });
    }
  }, [isDeletionSuccess]);

  const [
    patchDocument,
    { isSuccess: isPatchSuccess, isLoading: isPatchLoading },
  ] = usePatchDocumentMutation();

  const togglePrivacy = useCallback(() => {
    if (document?.id) {
      patchDocument({
        isPrivate: !document.isPrivate,
        documentId: document.id,
      });
    }
  }, [patchDocument, document]);

  useEffect(() => {
    if (isPatchSuccess) {
      toast.success(`La visiblité du document a bien été mise à jour`, {
        position: 'top-right',
      });
    }
  }, [isPatchSuccess]);

  return (
    <div className="flex flex-row items-center">
      {isFocused && (
        <DocumentEditionModal documentId={document.id} onClose={onCloseModal} />
      )}

      <AuthenticatedLink
        documentId={document.id}
        className="p-2 border border-gray-400 rounded-lg flex flex-row items-center"
      >
        {document.mimetype.includes('image') ? (
          <AuthenticatedImage
            documentId={document.id}
            alt={document.name}
            className="h-10 w-10 content-center object-cover rounded-lg"
          />
        ) : (
          <IoDocumentTextOutline size={24} />
        )}
        <span className="ml-1 font-main text-main">
          {computeDocumentName(document)}
        </span>
      </AuthenticatedLink>

      <button
        className="ml-2"
        onClick={togglePrivacy}
        disabled={isPatchLoading}
      >
        {document.isPrivate ? (
          <MdOutlinePublicOff size={24} />
        ) : (
          <MdPublic size={24} />
        )}
      </button>

      <button className="ml-2" onClick={onEdit}>
        <MdOutlineModeEdit size={24} />
      </button>

      <button className="ml-2" onClick={onDelete} disabled={isDeletionLoading}>
        <RiDeleteBinLine size={24} />
      </button>
    </div>
  );
};

const DocumentSection: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: documents } = useGetUserDocumentsQuery(userId, {
    skip: !userId,
  });
  const [createUserDocuments, { isSuccess, isLoading }] =
    useCreateUserDocumentsMutation();

  const onDrop = useCallback(
    (files: File[]) => {
      createUserDocuments({ userId, files });
    },
    [createUserDocuments, userId],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dragZone = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-row items-center">
          <Loader />
          <p className="font-main text-main ml-1">chargement en cours...</p>
        </div>
      );
    }

    if (isDragActive) {
      return (
        <p className="font-main text-main">
          Placez les documents ici afin de les ajouter
        </p>
      );
    }

    return (
      <p className="flex flex-row items-center font-main text-main">
        <IoIosAddCircleOutline size={24} />
        <span className="ml-1 underline">
          Placez des documents ici ou cliquez ici pour sélectionner des fichiers
        </span>
      </p>
    );
  }, [isLoading, isDragActive]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Les documents ont bien été ajoutés`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  const sections = useMemo(() => {
    const res = [];

    for (const type of Object.values(DocumentTypes)) {
      const section = {
        type,
        documents: documents?.filter((doc) => doc.type === type) || [],
      };

      if (section.type === DocumentTypes.OTHER) {
        section.documents = section.documents.concat(
          documents?.filter((doc) => !doc.type) || [],
        );
      }

      res.push(section);
    }

    return res;
  }, [documents]);

  return (
    <div>
      <SectionTitle title="Documents" className="mt-12 mb-6" />
      <div className="flex flex-col space-y-4 my-4">
        {sections?.map((section) => {
          if (!section.documents.length) {
            return null;
          }
          return (
            <div key={section.type} className="mb-4">
              <p className="font-main text-main font-semibold text-lg underline mb-1">
                {translateDocumentType(section.type, true)}
              </p>

              <div className="flex flex-col space-y-2">
                {section.documents.map((document) => (
                  <Document key={document.id} document={document} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!documents?.length && (
        <p className="font-main text-main flex flex-row items-center">
          <IoWarningOutline size={24} />
          <span className="mx-1">Aucun document ajouté</span>
          <IoWarningOutline size={24} />
        </p>
      )}

      <p
        className="mt-8 font-main text-main flex flex-row items-center"
        id="upload-documents"
      >
        <span className="ml-1">
          Ajouter des documents via le drag'n drop ci dessous :
        </span>
      </p>

      <div
        {...getRootProps()}
        className="border border-gray-400 border-dotted h-48 w-[800px] flex justify-center items-center rounded-lg mt-2 cursor-pointer"
      >
        <input {...getInputProps()} />
        {dragZone}
      </div>
    </div>
  );
};

export default DocumentSection;
