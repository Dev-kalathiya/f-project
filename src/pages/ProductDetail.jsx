import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
const baseurl = "https://json-server-deployment-zln4.onrender.com"
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseurl}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Section */}
      <div className="flex-grow">
        {/* Add space between navbar and product using margin */}
        <div className="container mx-auto mt-20"> {/* Increased the `mt` (margin-top) */}
          {loading ? (
            <div className="flex justify-center items-center">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-500" />
            </div>
          ) : product ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-auto max-h-[500px] w-full object-contain"
                  />
                </div>
                {/* Product Details */}
                <div className="p-6 md:w-1/2">
                  <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-gray-900 font-semibold text-xl mb-4">₹{product.price}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 mr-2">★</span>
                    <span>{product.rating || 4.3}</span>
                  </div>
                  {product.discount && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-4">
                      -{product.discount}%
                    </div>
                  )}
                  <button
                    onClick={handleAddToCart}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-900 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-xl text-gray-700">Product not found.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center w-full mt-auto">
        <p>© {new Date().getFullYear()} Damas Clothing. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4 items-center">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/06/Visa-Logo-2006.png"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://cdn0.iconfinder.com/data/icons/payment-method/480/rupay_payment_card_bank-512.png"
            alt="RuPay"
            className="h-12 mx-5"
          />
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
