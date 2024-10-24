import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@@/store';
import router from '@@/router';
import '@@/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
