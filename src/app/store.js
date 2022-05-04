import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './slices/spotifySlice';

// Création du store redux
export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
})