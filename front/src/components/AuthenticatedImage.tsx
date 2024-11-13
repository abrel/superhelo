import React from 'react';
import { useViewDocumentQuery } from '@@/services/document';

const AuthenticatedImage: React.FC<{
  documentId?: string;
  placeholder?: string;
  alt: string;
  className?: string;
}> = ({ documentId = '', placeholder, alt, className }) => {
  const { data: imageUrl } = useViewDocumentQuery(documentId, {
    skip: !documentId,
  });

  return (
    <img src={imageUrl || placeholder || ''} alt={alt} className={className} />
  );
};

export default AuthenticatedImage;
