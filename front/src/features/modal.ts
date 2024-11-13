import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { authApi } from '@@/services/auth';

export interface ModalState {
  showDocumentEditionModal: boolean;
}

const initialState = {
  showDocumentEditionModal: false,
} as ModalState;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openDocumentEditionModal(state) {
      state.showDocumentEditionModal = true;
    },
    hideDocumentEditionModal(state) {
      state.showDocumentEditionModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });
  },
});

export const { openDocumentEditionModal, hideDocumentEditionModal } =
  modalSlice.actions;

export default modalSlice;
