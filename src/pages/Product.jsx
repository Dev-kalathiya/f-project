import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilter = (e) => setFilterCategory(e.target.value);
  const handleSort = (e) => setSortOption(e.target.value);

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || product.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortOption === 'priceLowHigh') {
        return a.price - b.price;
      } else if (sortOption === 'priceHighLow') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Products</h2>

        {/* Search, Filter, and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none w-full md:w-1/3"
          />
          <select value={filterCategory} onChange={handleFilter} className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none w-full md:w-1/4">
            <option value="all">All Categories</option>
            <option value="jacket">Jackets</option>
            <option value="shoes">Shoes</option>
            {/* Add more categories as needed */}
          </select>
          <select value={sortOption} onChange={handleSort} className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none w-full md:w-1/4">
            <option value="default">Sort by</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-500" />
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-xl text-gray-700">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative">
                        {product.discount && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>
                        )}
                        <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{product.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-gray-900 font-semibold">${product.price}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-2">★</span>
                            <span>{product.rating || 4.5}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-500 text-white w-full px-4 py-2 rounded-b-lg hover:bg-green-600 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
