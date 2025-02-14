import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '@@/store';
import Sidebar from '@@/components/Sidebar';

const PublicRoute: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col bg-slate-50 w-full">
      <div className="sm:flex sm:flex-row">
        <Sidebar logged={!!auth.accessToken} />
        <div className="relative w-full sm:w-[calc(100%-190px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PublicRoute;
