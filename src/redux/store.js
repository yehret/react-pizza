import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter,
  },
});

window.__store__ = store;
