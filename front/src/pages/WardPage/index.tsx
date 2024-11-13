import React from 'react';
import { useParams } from 'react-router-dom';
import NewWardPage from '@@/pages/WardPage/NewWardPage';
import WardDashboardPage from '@@/pages/WardPage/WardDashboardPage';

const WardPage: React.FC = () => {
  const { wardId } = useParams();

  if (!wardId) {
    return null;
  }

  switch (wardId) {
    case 'new':
      return <NewWardPage />;
    default:
      return <WardDashboardPage wardId={wardId} />;
  }
};

export default WardPage;
