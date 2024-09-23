import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingCart } from 'react-icons/fi'; 

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalWithDiscount = subtotal - discount;
    return totalWithDiscount > 0 ? totalWithDiscount : 0;
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(0.1 * getTotalPrice());
      toast.success('Discount applied successfully!');
    } else {
      toast.error('Invalid discount code');
    }
  };

  const handleCheckout = () => {
    // Simulating checkout completion
    setIsCheckoutComplete(true);
    toast.success('Checkout successful!');
    
    // Clear the cart
    dispatch(clearCart());
  };

  const continueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-6">
      {isCheckoutComplete ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h3 className="text-4xl font-semibold mb-4">Thank You for Your Purchase!</h3>
          <p className="text-lg text-gray-700 mb-6">Your order has been successfully placed.</p>
          <img 
            src="https://i.ibb.co/dmQgLjx/success-icon-23194.png" 
            alt="Success" 
            className="w-10 h-10 mb-6 animate-bounce" 
          />
          <button
            onClick={continueShopping}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <FiShoppingCart className="text-gray-500 text-8xl mb-4 animate-pulse" />
          <h3 className="text-2xl font-semibold mb-2">Your cart is empty!</h3>
          <p className="text-lg text-gray-600 mb-6">Keep shopping to find great products.</p>
          <button
            onClick={continueShopping}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            Go to Products
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 mb-4 border-b rounded-lg">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">SKU: {item.description}</p>
                  <p className="text-sm text-gray-600">Reviews: ★★★★☆</p>
                  {item.inStock < 3 && (
                    <p className="text-yellow-500">Hurry up! Only {item.inStock} left in stock - order soon!</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-x-6 mt-4 sm:mt-0 w-full sm:w-auto">
                <div className="w-full sm:w-1/4">
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    className="p-2 border rounded-lg w-full"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                    max={item.inStock}
                  />
                </div>
                <p className="font-semibold w-full sm:w-1/4 mt-2 sm:mt-0">Total: ₹{item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors mt-2 sm:mt-0"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Discount Code Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center my-6">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="p-2 border rounded-lg w-full sm:w-64"
              />
              <button
                onClick={handleApplyDiscount}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-lg font-semibold">Discount: ₹{discount}</p>
          </div>

          {/* Price Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
            <h3 className="text-lg font-semibold">Subtotal: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
            <h3 className="text-lg font-semibold">Total: ₹{getTotalPrice()}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors mt-4 sm:mt-0"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
