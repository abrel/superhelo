import React from 'react';
import { Link } from 'react-router-dom';
import { useViewDocumentQuery } from '@@/services/document';

const AuthenticatedLink: React.FC<{
  documentId?: string;
  className?: string;
  children?: any;
}> = ({ documentId = '', className, children }) => {
  const { data: documentUrl } = useViewDocumentQuery(documentId, {
    skip: !documentId,
  });

  return (
    <Link
      to={documentUrl || ''}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
};

export default AuthenticatedLink;
