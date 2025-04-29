import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiOutlineLoading3Quarters, AiOutlineArrowLeft } from 'react-icons/ai';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [selectedSize, setSelectedSize] = useState('M');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const baseurl = "https://json-server-deployment-zln4.onrender.com";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseurl}/product/${id}`);
        setProduct(response.data);
        if (response.data.image && !response.data.images) {
          setProduct({
            ...response.data,
            images: [response.data.image, response.data.image, response.data.image]
          });
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      toast.error(`${product.title} is already in your cart!`);
      return;
    }

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity: 1
    }));

    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (!cartItems.find(item => item.id === product.id)) {
      navigate('/cart');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const colors = ['Blue', 'Black', 'White', 'Gray'];
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <button 
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <AiOutlineArrowLeft className="text-indigo-600" />
          <span className="font-medium text-gray-700">Back to Products</span>
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-indigo-600" />
          </div>
        ) : product ? (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-md p-6 mb-4 h-[500px] flex items-center justify-center">
                  <img
                    src={product.images ? product.images[selectedImage] : product.image}
                    alt={product.title}
                    className="h-full w-full object-contain transition-all duration-300"
                  />
                </div>
                {product.images && (
                  <div className="flex gap-3 overflow-x-auto py-2 px-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-indigo-500' : 'border-gray-200'} transition-all`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm font-medium text-indigo-600 uppercase tracking-wider">Premium Collection</span>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <FiHeart className="text-gray-500 hover:text-red-500 text-xl" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <FiShare2 className="text-gray-500 hover:text-indigo-500 text-xl" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(42 customer reviews)</span>
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed border-l-2 border-indigo-200 pl-4">{product.description}</p>

                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Color: <span className="font-semibold">{selectedColor}</span></h3>
                  <div className="flex gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-indigo-500' : 'border-gray-200'} transition-all`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Size: <span className="font-semibold">{selectedSize}</span></h3>
                  <div className="flex gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'} transition-all`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900 mr-4">₹{product.price}</span>
                    {product.discount && (
                      <span className="text-lg text-gray-500 line-through mr-4">
                        ₹{Math.round(product.price * (1 + product.discount/100))}
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                        Save {product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-green-600 text-sm font-medium">
                    <span>In Stock</span>
                    <span className="ml-2">• Free Shipping</span>
                    <span className="ml-2">• 30-Day Returns</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                     onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-3"
                  >
                    <FiShoppingCart className="text-xl" />
                    <span>Add to Cart</span>
                  </button>
                  {/* <button
                      onClick={() => handleAddToCart(product)}
                      aria-label="Add to cart"
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center z-10"
                    >
                      <FiShoppingBag className="mr-2" />
                      Add to Cart
                    </button> */}
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-4 px-6 rounded-lg transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Material</h3>
                      <p className="text-sm font-medium text-gray-900">Premium Cotton</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Care Instructions</h3>
                      <p className="text-sm font-medium text-gray-900">Machine Wash Cold</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping</h3>
                      <p className="text-sm font-medium text-gray-900">2-3 business days</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Returns</h3>
                      <p className="text-sm font-medium text-gray-900">30 day policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              We couldn't find the product you're looking for. It might be unavailable or removed.
            </p>
            <button 
              onClick={handleGoBack}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
            >
              <AiOutlineArrowLeft />
              Back to Products
            </button>
          </div>
        )}
      </main>
          {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;