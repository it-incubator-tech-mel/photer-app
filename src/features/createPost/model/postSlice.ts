import { PixelCrop } from '@/shared/config/aspectRatios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreationStep = 'upload' | 'crop' | 'filters' | 'description';

export type PhotoSettings = {
  url: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  croppedAreaPixels: PixelCrop | null;
  naturalAspect: number;
  filter?: string;
  cropRatio?: string;
  originalWidth?: number;
  originalHeight?: number;
  croppedWidth?: number;
  croppedHeight?: number;
};

type PostCreationState = {
  currentStep: CreationStep;
  photos: PhotoSettings[];
  currentPhotoIndex: number;
  description: string;
  error?: string;
};
const initialState: PostCreationState = {
  currentStep: 'upload',
  photos: [],
  currentPhotoIndex: 0,
  description: '',
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    goToStep: (state, action: PayloadAction<CreationStep>) => {
      state.currentStep = action.payload;
    },
    addPhotos: (state, action: PayloadAction<PhotoSettings[]>) => {
      const photosWithDefaults = action.payload.map((photo) => ({
        ...photo,
        cropRatio: 'Original',
      }));
      state.photos = [...state.photos, ...photosWithDefaults];
      state.currentStep = 'crop';
    },

    setCurrentPhotoIndex: (state, action: PayloadAction<number>) => {
      state.currentPhotoIndex = action.payload;
    },
    setPhotoSettings: (
      state,
      action: PayloadAction<Partial<PhotoSettings>>
    ) => {
      const currentPhoto = state.photos[state.currentPhotoIndex];
      if (currentPhoto) {
        state.photos[state.currentPhotoIndex] = {
          ...currentPhoto,
          ...action.payload,
        };
      }
    },
    deletePhoto: (state, action: PayloadAction<number>) => {
      state.photos.splice(action.payload, 1);
    },
    setCroppedImage: (state, action: PayloadAction<string>) => {
      state.photos[state.currentPhotoIndex].url = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  goToStep,
  setCurrentPhotoIndex,
  setPhotoSettings,
  addPhotos,
  setCroppedImage,
  deletePhoto,
  resetState,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
