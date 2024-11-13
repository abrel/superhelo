import { createBrowserRouter } from 'react-router-dom';
import Layout from '@@/components/Layout';
import PrivateRoute from '@@/components/PrivateRoute';

import SigninPage from '@@/pages/SigninPage';
import SignupPage from '@@/pages/SignupPage';
import ResetPasswordPage from '@@/pages/ResetPasswordPage';
import ChangePasswordPage from '@@/pages/ChangePasswordPage';
import FallbackPage from '@@/pages/FallbackPage';

import WardsPage from '@@/pages/WardsPage';
import WardPage from '@@/pages/WardPage';
import MePage from '@@/pages/MePage';
import CalendarPage from '@@/pages/CalendarPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <FallbackPage />,
    children: [
      {
        path: '/',
        index: true,
        element: <SigninPage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/register',
        element: <SignupPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: '/error',
        element: <FallbackPage />,
      },
      {
        path: '/wards',
        element: <PrivateRoute />,
        children: [
          { index: true, element: <WardsPage /> },
          {
            path: ':wardId',
            element: <WardPage />,
          },
        ],
      },
      {
        path: '/calendar',
        element: <PrivateRoute />,
        children: [{ index: true, element: <CalendarPage /> }],
      },
      {
        path: '/me',
        element: <PrivateRoute />,
        children: [{ index: true, element: <MePage /> }],
      },
      {
        path: '*',
        element: <SigninPage />,
      },
    ],
  },
]);

export default router;
