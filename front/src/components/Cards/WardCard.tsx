import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedImage from '@@/components/AuthenticatedImage';
import { getAge } from '@@/utils/date';

const WardCard: React.FC<{ ward: SH.User }> = ({ ward }) => {
  return (
    <Link
      to={`/wards/${ward.id}`}
      className="relative mr-2 mb-2 p-4 rounded-lg border flex flex-row items-center w-fit"
    >
      <AuthenticatedImage
        documentId={ward.photoDocumentId}
        placeholder="/user-profile-placeholder.jpg"
        alt={`${ward.firstName} ${ward.lastName}`}
        className="w-16 h-16 object-cover rounded-full"
      />

      <div className="flex flex-col ml-2 font-main text-main font-semibold">
        <p className="text-lg">
          {ward.firstName} {ward.lastName}
        </p>
        {!!ward.birthDate && <p>{getAge(ward.birthDate)} ans</p>}
      </div>
    </Link>
  );
};

export default WardCard;
