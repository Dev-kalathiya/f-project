
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const userurl ="https://json-server-deployment-zln4.onrender.com"

// Async thunks for signup and login
export const signupUser = createAsyncThunk('auth/signupUser', async (userData, { rejectWithValue }) => {
  try {
    // Check if user already exists
    const existingUser = await axios.get(`${userurl}/user?email=${userData.email}`);
    if (existingUser.data.length > 0) {
      return rejectWithValue('User already exists');
    }
  
    const response = await axios.post(`${userurl}/user`, userData);
    localStorage.setItem('user', JSON.stringify(response.data)); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    // Verify user credentials
    const response = await axios.get(`${userurl}/user?email=${credentials.email}`);
    const user = response.data[0];
    if (user && user.password === credentials.password) {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return rejectWithValue('Invalid email or password');
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Get initial user state from localStorage
const userFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromLocalStorage, // Initialize from localStorage
    isLoggedIn: !!userFromLocalStorage, // Check if user is logged in
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user'); // Remove user data from localStorage
      toast.success('Logged out successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.loading = false;
        toast.success('Signup successful!');
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.loading = false;
        toast.success('Login successful!');
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
