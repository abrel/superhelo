import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '@@/store';
import Sidebar from '@@/components/Sidebar';

const PrivateRoute: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/');
    }
  }, [auth.accessToken, navigate]);

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
