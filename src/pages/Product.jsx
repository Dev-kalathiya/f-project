import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AiOutlineLoading3Quarters, AiOutlineDown, AiOutlineSearch, AiOutlineFilter, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Products</h2>

        {/* Dropdown for Search, Filter, and Sort */}
        <div className="relative mb-6">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-4 py-2 border rounded-md bg-white shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-500 w-full md:w-1/4">
            <span className="mr-2 font-semibold">Options</span>
            <AiOutlineDown className="text-lg" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="flex flex-col">
                <div className="p-4 border-b flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                  <AiOutlineSearch className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border-none outline-none w-full"
                  />
                </div>
                <div className="p-4 border-b flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                  <AiOutlineFilter className="text-gray-600" />
                  <select value={filterCategory} onChange={handleFilter} className="px-4 py-2 border-none outline-none w-full">
                    <option value="all">All Categories</option>
                    <option value="jacket">Jackets</option>
                    <option value="shirt">shirt</option>
                    <option value="fashion">fashion</option>
                    <option value="t-shirt">t-shirt</option>
                    <option value="shoes">Shoes</option>
                    {/* Add more categories as needed */}
                  </select>
                </div>
                <div className="p-4 flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <AiOutlineSortAscending className={`text-gray-600 ${sortOption === 'priceLowHigh' ? 'text-green-500' : ''}`} />
                    <AiOutlineSortDescending className={`text-gray-600 ${sortOption === 'priceHighLow' ? 'text-green-500' : ''}`} />
                  </div>
                  <select value={sortOption} onChange={handleSort} className="px-4 py-2 border-none outline-none w-full">
                    <option value="default">Sort by</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
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
                  <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105">
                    <Link to={`/products/${product.id}`}>
                      <div className="relative">
                        {product.discount && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>
                        )}
                        <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                        <p className="text-gray-900 font-semibold truncate">{product.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-gray-900 font-semibold">${product.price}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-2">★</span>
                            <span>{product.rating || 4.3}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-500 text-white px-4 py-2 rounded-b-lg hover:bg-green-600 transition duration-300"
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

      {/* Footer */}
      <footer className="bg-black text-white py-8 text-center">
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
            className="h-8"
          />
          {/* Add more payment method logos as needed */}
        </div>
      </footer>
    </div>
  );
};

export default Products;
