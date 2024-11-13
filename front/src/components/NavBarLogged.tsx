import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useGetMeQuery, useHandleAvatarMutation } from '@@/services/user';
import AuthenticatedImage from '@@/components/AuthenticatedImage';

const NavBarLogged: React.FC = () => {
  const { data: me } = useGetMeQuery();

  const [uploadAvatar] = useHandleAvatarMutation();

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length && me?.id) {
        uploadAvatar({ id: me.id, file: files[0] });
      }
    },
    [uploadAvatar, me?.id],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-cyan-400 fixed top-0 w-full z-20 flex flex-row px-4 py-3 justify-between items-center">
      <Link to="/wards" className="text-white">
        <img src="/logo.svg" className="w-28" />
      </Link>

      <div className="flex flex-row items-center">
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <AuthenticatedImage
            documentId={me?.photoDocumentId}
            placeholder="/user-profile-placeholder.jpg"
            alt={`${me?.firstName} ${me?.lastName}`}
            className="w-6 sm:w-10 sm:h-10 object-cover bg-white font-main rounded-full"
          />
        </div>

        <Link className="cursor-pointer" to="/me">
          <span className="ml-2 mr-1 text-white font-main underline">
            {me?.firstName} {me?.lastName}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavBarLogged;
