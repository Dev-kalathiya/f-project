import { configureStore } from '@reduxjs/toolkit';

// Import other reducers as needed

const store = configureStore({
  reducer: {
    auth: authR
    // Add other reducers here
  },
});

export default store;
