import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CreationStep = 'upload' | 'crop' | 'filters' | 'description';

type PostCreationState = {
  isModalOpen: boolean;
  currentStep: CreationStep;
  maxPhotos: number;
  photos: string[];
  currentPhotoIndex: number;
  cropRatio: '1:1' | '4:5' | '16:9';
  filters: string[];
  description: string;
  error?: string;
};
const initialState: PostCreationState = {
  isModalOpen: false,
  currentStep: 'upload',
  maxPhotos: 10,
  photos: [],
  currentPhotoIndex: 0,
  cropRatio: '1:1',
  filters: [],
  description: '',
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.isModalOpen = true;
      state.currentStep = 'upload';
      state.photos = [];
      console.log(state.isModalOpen);
    },
    closePostModal: () => initialState,
    goToStep: (state, action: PayloadAction<CreationStep>) => {
      state.currentStep = action.payload;
    },
    setPhotos: (state, action: PayloadAction<string[]>) => {
      state.photos = action.payload;
      state.currentStep = 'crop';
    },
    deletePhoto: (state, action: PayloadAction<number>) => {
      state.photos.splice(action.payload, 1);
    },
    setCropRatio: (state, action: PayloadAction<'1:1' | '4:5' | '16:9'>) => {
      state.cropRatio = action.payload;
    },
    setCroppedImage: (state, action: PayloadAction<string>) => {
      state.photos[state.currentPhotoIndex] = action.payload;
    },
  },
});

export const {
  openPostModal,
  closePostModal,
  goToStep,
  setPhotos,
  setCropRatio,
  setCroppedImage,
  deletePhoto,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
