import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@@/store';
import NavBar from '@@/components/NavBarLogged';
import SideBar from '@@/components/SideBar';

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.accessToken) {
      navigate('/');
    }
  }, [auth.accessToken, navigate]);

  if (location.pathname.includes('/c.us/')) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-grow pt-16 bg-slate-50 w-full">
        <div className="flex flex-row min-h-screen">
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute;
