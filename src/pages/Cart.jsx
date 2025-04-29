import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiTag } from 'react-icons/fi';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../components/Footer';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // Show available discount code on first render
  useEffect(() => {
    toast.info('Use code "SAVE10" for 10% off your order!', {
      autoClose: 5000,
      position: 'top-right'
    });
  }, []);

  // Recalculate discount when cart items change
  useEffect(() => {
    if (isDiscountApplied) {
      const newDiscount = 0.1 * getSubtotal();
      setDiscount(newDiscount);
    }
  }, [cartItems, isDiscountApplied]);

  const handleQuantityChange = (id, quantity) => {
    if (isNaN(quantity)) return;
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    
    if (quantity < 1) quantity = 1;
    if (item.inStock && quantity > item.inStock) {
      toast.warning(`Only ${item.inStock} items available in stock`);
      quantity = item.inStock;
    }
    
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const totalWithDiscount = subtotal - discount;
    return Math.max(0, totalWithDiscount);
  };

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    
    if (!code) {
      toast.error('Please enter a discount code');
      return;
    }
    
    if (isDiscountApplied) {
      toast.info('Discount already applied');
      return;
    }

    if (code === 'SAVE10') {
      const discountAmount = 0.1 * getSubtotal();
      setDiscount(discountAmount);
      setIsDiscountApplied(true);
      toast.success(
        <div>
          <p className="font-bold">10% Discount Applied!</p>
          <p>₹{discountAmount.toFixed(2)} saved</p>
        </div>,
        { autoClose: 3000 }
      );
    } else {
      toast.error(
        <div>
          <p>Invalid discount code</p>
          <p className="text-sm mt-1">Try "SAVE10" for 10% off</p>
        </div>
      );
    }
  };

  const handleRemoveDiscount = () => {
    setDiscount(0);
    setDiscountCode('');
    setIsDiscountApplied(false);
    toast.info('Discount removed');
  };

  const handleCheckout = () => {
    setIsCheckoutComplete(true);
    toast.success(
      <div className="text-center">
        <p className="font-bold">Order Confirmed!</p>
        <p>₹{getTotalPrice().toFixed(2)} charged</p>
        {discount > 0 && <p className="text-green-500">₹{discount.toFixed(2)} saved</p>}
      </div>
    );
    dispatch(clearCart());
  };

  const continueShopping = () => {
    navigate('/products');
  };

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <button 
            onClick={continueShopping}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8"
          >
            <FiArrowLeft />
            <span className="font-medium">Continue Shopping</span>
          </button>

          {isCheckoutComplete ? (
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto text-center">
              <BsCheckCircleFill className="text-green-500 text-6xl mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <button
                onClick={continueShopping}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <FiArrowLeft />
                Back to Shop
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 max-w-md mx-auto text-center">
              <FiShoppingCart className="text-gray-300 text-6xl mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Your Cart is Empty</h3>
              <p className="text-gray-500 mb-4">
                Looks like you haven't added anything to your cart yet
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-center">
                  <FiTag className="text-yellow-500 mr-2" />
                  <p className="text-yellow-700">
                    <span className="font-medium">Pro Tip:</span> Use code <span className="font-bold">SAVE10</span> for 10% off
                  </p>
                </div>
              </div>
              <button
                onClick={continueShopping}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </h2>
                    {!isDiscountApplied && (
                      <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
                        <FiTag className="text-indigo-500 mr-1" />
                        <span className="text-sm text-indigo-700">
                          Use <span className="font-bold">SAVE10</span> for 10% off
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {cartItems.map(item => {
                    const price = Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 1;
                    const itemTotal = price * quantity;
                    
                    return (
                      <div key={item.id} className="p-6 border-b last:border-b-0">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="w-full sm:w-32 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-32 object-contain rounded-lg" 
                            />
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">{item.title || 'Unknown Product'}</h3>
                              <button 
                                onClick={() => handleRemove(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{item.description || 'No description'}</p>
                            
                            {(item.inStock && item.inStock < 3) && (
                              <p className="text-yellow-600 text-sm mt-2">
                                Only {item.inStock} left in stock
                              </p>
                            )}
                            
                            <div className="mt-4 flex items-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded-l-md bg-gray-50"
                                disabled={quantity <= 1}
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 text-center border-t border-b"
                                min="1"
                                max={item.inStock || 999}
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center border rounded-r-md bg-gray-50"
                                disabled={quantity >= (item.inStock || 999)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="w-full sm:w-32 flex-shrink-0 text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ₹{formatPrice(itemTotal)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              ₹{formatPrice(price)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Code
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter SAVE10"
                        className="flex-grow px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isDiscountApplied}
                      />
                      {isDiscountApplied ? (
                        <button
                          onClick={handleRemoveDiscount}
                          className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyDiscount}
                          className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {!isDiscountApplied && (
                      <p className="text-sm text-gray-500">
                        Try <span className="font-bold">SAVE10</span> for 10% off
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">₹{formatPrice(getSubtotal())}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount (10%)</span>
                        <span className="text-green-600">-₹{formatPrice(discount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

  <Footer/>
    </div>
  );
};

export default CartPage;