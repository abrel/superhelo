import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@@/components/Layout';

import DashboardPage from '@@/pages/DashboardPage';
import SigninPage from '@@/pages/SigninPage';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: '/',
        index: true,
        element: <SigninPage />,
      },
      {
        path: '/dashboard',
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <SigninPage />,
      },
    ],
  },
]);

export default router;
