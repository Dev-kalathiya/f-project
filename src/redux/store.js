import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cartSlice';
import authSlice from './authSlice';


const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice, 
  },
});

export default store;
