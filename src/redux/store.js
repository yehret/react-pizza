import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

window.__store__ = store;
