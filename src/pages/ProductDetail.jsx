import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProductDetail = () => {
  const { id } = useParams(); // Extract the product ID from the URL params
  const [product, setProduct] = useState(null); // State to store product details
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`); // Make sure your API endpoint is correct
        setProduct(response.data); // Store the product data in the state
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };
    
    fetchProduct();
  }, [id]); // The effect runs whenever the ID changes

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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-500" />
          </div>
        ) : product ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <img
                src={product.image}
                alt={product.title}
                className="h-96 w-full object-cover md:w-1/2"
              />
              <div className="p-6 md:w-1/2">
                <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-gray-900 font-semibold text-xl mb-4">${product.price}</p>
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
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
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
  );
};

export default ProductDetail;
