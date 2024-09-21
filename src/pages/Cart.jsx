import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
      useEffect (()=>{
        dispatch 
      },[])
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {cartItems.items.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <label>Quantity: </label>
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
              <p className="font-semibold">Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Total Price: ₹{getTotalPrice()}</h3>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
