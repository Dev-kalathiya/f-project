import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart items from local storage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Helper function to save cart items to local storage
const saveCartToLocalStorage = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

// Define the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),  // Load initial state from local storage if available
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);  // Save updated cart to local storage
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items);  // Save updated cart to local storage
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToLocalStorage(state.items);  // Save updated cart to local storage
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cartItems');  // Clear cart from local storage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
