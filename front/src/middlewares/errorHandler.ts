import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const defaultErrorMessage = 'Une erreur est survenue';

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { payload } = action;
      const { data } = payload as { data: any };

      const validationErrorMessage = data?.details?.[0]?.message;

      const message =
        validationErrorMessage || data?.messageText || defaultErrorMessage;

      toast.error(message, {
        position: 'top-right',
      });
    }

    return next(action);
  };
