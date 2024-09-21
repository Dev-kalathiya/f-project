import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Import addToCart action

const Products = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/product');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-900 font-semibold">${product.price}</p>
                </div>
              </Link>
              <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
