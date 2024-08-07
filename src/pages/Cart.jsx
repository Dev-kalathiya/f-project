import React, { useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Top Gun: Flight Crew',
      size: 'M',
      price: 1699,
      quantity: 1,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Another Product',
      size: 'L',
      price: 999,
      quantity: 1,
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: quantity } : item));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        <div className="flex flex-col space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <img src={item.image} alt="Product" className="w-20 h-20 object-contain" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">Size: {item.size}</p>
                <p className="text-gray-700">₹ {item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <label htmlFor={`quantity-${item.id}`} className="block text-sm font-medium text-gray-700">Quantity</label>
                <select
                  id={`quantity-${item.id}`}
                  name={`quantity-${item.id}`}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <p className="text-gray-900 font-semibold">₹ {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <p className="text-lg font-semibold">Total: ₹ {getTotalPrice()}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
  