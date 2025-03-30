import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useIsLogged from '@@/hooks/useIsLogged';
import Sidebar from '@@/components/Sidebar';

const PrivateRoute: React.FC = () => {
  const isLogged = useIsLogged();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return (
    <div className="flex flex-col flex-grow bg-slate-50 w-full">
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <div className="w-[calc(100%-190px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
