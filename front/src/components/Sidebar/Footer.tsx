import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMeQuery } from '@@/services/user';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import { translateRole } from '@@/constants/user';

const Footer: React.FC = () => {
  const { data: me } = useGetMeQuery();

  return (
    <Link
      className="flex flex-row items-center cursor-pointer h-20 pl-3 font-main"
      to="/me"
    >
      {me?.photoDocumentId ? (
        <AuthenticatedImage
          documentId={me?.photoDocumentId}
          placeholder="/user-profile-placeholder.jpg"
          alt={`${me?.firstName} ${me?.lastName}`}
          className="w-6 h-6 sm:w-10 sm:h-10 bg-white font-main rounded-full"
        />
      ) : (
        <div className="w-10 h-10 font-main rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
          <span className="text-sky-600 font-semibold">
            {me?.firstName?.slice(0, 1)}
            {me?.lastName?.slice(0, 1)}
          </span>
        </div>
      )}

      <div className="ml-2 overflow-scroll w-[130px]">
        <p className="text-xs text-slate-700 truncate">
          {me?.firstName}&nbsp;
          <span className="font-semibold truncate">{me?.lastName}</span>
        </p>
        <p className="text-xs text-slate-500">{translateRole(me?.role)}</p>
      </div>
    </Link>
  );
};

export default Footer;
