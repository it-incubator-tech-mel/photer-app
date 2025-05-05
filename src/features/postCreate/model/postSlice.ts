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
  // надо сохранять чтобы откатываться
  originalUrl: string;
};

type PostCreationState = {
  currentStep: CreationStep;
  photos: PhotoSettings[];
  currentPhotoIndex: number;
  description: string;
  error?: string;
};

// начальный стейт в photos массив фоток с настройками
const initialState: PostCreationState = {
  currentStep: 'upload',
  photos: [],
  currentPhotoIndex: 0,
  description: '',
};

const postSlice = createSlice({
  name: 'post',
  // начальный стейт в photos массив фоток с настройками...
  initialState,
  reducers: {
    // ... и шаг, текущая модалка
    goToStep: (state, action: PayloadAction<CreationStep>) => {
      state.currentStep = action.payload;
    },

    // загружаем фото и шаг ставим первый
    addPhotos: (
      state,
      action: PayloadAction<Omit<PhotoSettings, 'originalUrl'>[]>
    ) => {
      const photosWithDefaults = action.payload.map((photo) => ({
        ...photo,
        cropRatio: 'Original',
        originalUrl: photo.url,
      }));
      state.photos = [...state.photos, ...photosWithDefaults];
      state.currentStep = 'crop';
    },

    // выбираем определенной фото по индексу...
    setCurrentPhotoIndex: (state, action: PayloadAction<number>) => {
      state.currentPhotoIndex = action.payload;
    },

    // ... и добавляем ему изменения
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

    // новый редьюсер для сброса фильтра
    resetPhotoFilter: (state) => {
      const currentPhoto = state.photos[state.currentPhotoIndex];
      if (currentPhoto) {
        state.photos[state.currentPhotoIndex] = {
          ...currentPhoto,
          url: currentPhoto.originalUrl, // возвращаем исходный URL
          filter: undefined,
        };
      }
    },

    deletePhoto: (state, action: PayloadAction<number>) => {
      state.photos.splice(action.payload, 1);
    },
    // обрезка
    setCroppedImage: (state, action: PayloadAction<string>) => {
      const idx = state.currentPhotoIndex;
      state.photos[idx] = {
        ...state.photos[idx],
        url: action.payload,
        // originalUrl: action.payload, // обновляем здесь тоже
      };
    },
    // resetPhotoCrop: (state) => {
    //   const idx = state.currentPhotoIndex;
    //   const photo = state.photos[idx];
    //   if (photo) {
    //     state.photos[idx] = {
    //       ...photo,
    //       url: photo.uploadUrl, // возвращаем исходное
    //       croppedAreaPixels: null, // сбрасываем данные обрезки
    //       zoom: 1,
    //       rotation: 0,
    //       originalUrl: photo.uploadUrl, // и для фильтров тоже возвращаем
    //     };
    //   }
    // },
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
  resetPhotoFilter,
} = postSlice.actions;

export const postReducer = postSlice.reducer;
