import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import usePageTitle from '@@/hooks/usePageTitle';
import useScrollToAnchor from '@@/hooks/useScrollToAnchor';

const Layout: React.FC = () => {
  usePageTitle();
  useScrollToAnchor();

  return (
    <div className="flex flex-col bg-gray-50 h-full">
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
