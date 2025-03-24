import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type ModalProps = {
  title: string;
  description: React.ReactNode;
};
type ModalState = {
  isOpen: boolean;
  modalProps: ModalProps;
};

const initialState: ModalState = {
  isOpen: false,
  modalProps: {
    title: '',
    description: '',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalProps?: ModalState['modalProps'];
      }>
    ) => {
      state.isOpen = true;
      state.modalProps = action.payload.modalProps || initialState.modalProps;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalProps = {
        title: '',
        description: '',
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
