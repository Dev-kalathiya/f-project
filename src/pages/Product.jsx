import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiShoppingBag,
  FiStar,
  FiLoader
} from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const baseurl = "https://json-server-deployment-zln4.onrender.com";

  // Sample categories - replace with your actual categories
  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'jacket', name: 'Jackets' },
    { id: 'shirt', name: 'Shirts' },
    { id: 'dress', name: 'Dresses' },
    { id: 'hoodie', name: 'Hoodies' },
    { id: 'accessories', name: 'Accessories' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/product`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
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

    toast.success(`${product.title} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: 'bg-pink-500 text-white'
    });
  };

  const filteredProducts = products
    .filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || product.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortOption === 'priceLowHigh') return a.price - b.price;
      if (sortOption === 'priceHighLow') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4);
    const hasHalfStar = (rating || 4) % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  {/* Layered Background with Subtle Pattern */}
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10"></div>
  
  {/* Metallic Accent Elements */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-pink-500 to-transparent"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-400/30"></div>
  <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-pink-400/30"></div>

  {/* Content with Visual Hierarchy */}
  <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
    {/* <div className="mb-8 flex items-center justify-center space-x-4">
      <div className="w-12 h-px bg-amber-400"></div>
      <span className="text-sm uppercase tracking-widest text-amber-400">New Arrivals</span>
      <div className="w-12 h-px bg-amber-400"></div>
    </div> */}
    
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
      <span className="block">Explore</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">Collections</span>
    </h1>
    
    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 px-4 border-l-2 border-r-2 border-white/10 py-2">
      Discover our carefully curated fashion collections for every occasion
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110">
        Shop Now
      </button>
      {/* <button className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300">
        View Lookbook
      </button> */}
    </div>
  </div>

  {/* Luxury Brand Elements */}
  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
    <div className="flex items-center space-x-8 opacity-80">
      <span className="text-xs text-white/50">PREMIUM FABRICS</span>
      <div className="w-px h-4 bg-white/30"></div>
      <span className="text-xs text-white/50">ETHICAL SOURCING</span>
      <div className="w-px h-4 bg-white/30"></div>
      <span className="text-xs text-white/50">WORLDWIDE SHIPPING</span>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-12">
          {/* Mobile Filters Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>

          {/* Filters Panel */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block bg-white p-6 rounded-lg shadow-md mb-8`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search products..."
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  id="sort"
                  className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Featured</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Mobile Close Button */}
            {mobileFiltersOpen && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="md:hidden mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Apply Filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiLoader className="animate-spin text-4xl text-pink-500 mb-4" />
            <p className="text-gray-600">Loading our finest collections...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setSortOption('default');
              }}
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                  </Link>

                  {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      aria-label="Add to cart"
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center z-10"
                    >
                      <FiShoppingBag className="mr-2" />
                      Add to Cart
                    </button>

                  {/* Discount Tag */}
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-pink-500 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                  </Link>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                      <span className="text-gray-500 text-sm ml-1">
                        ({product.reviewCount || 24})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
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

      {/* Footer - You can use your existing Footer component */}
      <Footer />
    </div>
  );
};

export default Products;