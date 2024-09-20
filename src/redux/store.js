import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

// Import other reducers as needed

const store = configureStore({
  reducer: {
    auth: authSlice
    
  },
});

export default store;
