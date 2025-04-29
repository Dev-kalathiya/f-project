import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaArrowRight, FaShoppingBag, FaStar } from "react-icons/fa";

const Home = () => {
  const [customers, setCustomers] = useState(140000);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (customers < 145250) {
      const interval = setInterval(() => {
        setCustomers((prev) => (prev < 145250 ? prev + Math.floor(Math.random() * 10 + 3) : 145250));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [customers]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      image: "https://i.ibb.co/986sRV1/young-man-running-trail-forest-23-2148776372-transformed.jpg",
      title: "Urban Explorer Jacket",
      price: "₹1100",
      category: "Men"
    },
    {
      id: 2,
      image: "https://i.ibb.co/WVc2nY7/De-Watermark-ai-1726900120510.png",
      title: "Elegance Silk Dress",
      price: "₹1500",
      category: "Women"
    },
    {
      id: 3,
      image: "https://i.ibb.co/2SjhTdC/morning-walk-fresh-air-mountains-651396-2702-transformed.jpg",
      title: "Trailblazer Hoodie",
      price: "₹3000",
      category: "Men"
    },
    {
      id: 4,
      image: "https://i.ibb.co/GTpm244/De-Watermark-ai-1726900139848.png",
      title: "Evening Glow Gown",
      price: "₹2500",
      category: "Men"
    },
    {
      id: 5,
      image: "https://i.ibb.co/Bgsc5WP/De-Watermark-ai-1726900292590.png",
      title: "Classic Denim Set",
      price: "₹1899",
      category: "Men"
    },
    {
      id: 6,
      image: "https://i.ibb.co/khVW2rv/young-handsome-man-quarry-alone-1303-23776-transformed.jpg",
      title: "Premium Leather Jacket",
      price: "₹2499",
      category: "Men"
    },
  ];

  const features = [
    { title: "Premium Quality", desc: "Crafted with finest materials" },
    { title: "Eco-Friendly", desc: "Sustainable fashion choices" },
    { title: "Fast Shipping", desc: "Delivered in 2-3 business days" },
    { title: "Easy Returns", desc: "30-day return policy" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1467779009031-53938b78ca38?q=80&w=2070&auto=format&fit=crop)",
            transform: `scale(${1 + scrollY * 0.0005})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            DAMAS <span className="text-pink-400">CLOTHING</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Where contemporary fashion meets timeless elegance
          </p>
          <div className="flex gap-4">
            <Link 
              to="/products" 
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
            >
              Shop Now <FaArrowRight />
            </Link>
            {/* <Link 
              to="/collections" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Explore Collections
            </Link> */}
          </div>
        </div>
        
        {/* Scrolling indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white mt-2 rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collections</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group overflow-hidden rounded-xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop" 
              alt="Men's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Men's Wear</h3>
                <Link 
                  to="/products" 
                  className="text-white flex items-center gap-2 hover:text-pink-300 transition-colors"
                >
                  Explore Collection <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop" 
              alt="Women's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Women's Wear</h3>
                <Link 
                  to="/products" 
                  className="text-white flex items-center gap-2 hover:text-pink-300 transition-colors"
                >
                  Explore Collection <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-xl h-96">
            <img 
              src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2070&auto=format&fit=crop" 
              alt="Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                <Link 
                  to="/products" 
                  className="text-white flex items-center gap-2 hover:text-pink-300 transition-colors"
                >
                  Explore Collection <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest collection that blends comfort with high fashion</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link 
                      to={`/products`}
                      className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white text-center rounded-lg font-medium transition-colors duration-300"
                    >
                      Quick View
                    </Link>
                  </div>
                  {product.category && (
                    <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{product.title}</h3>
                      <p className="text-gray-500">{product.category}</p>
                    </div>
                    <p className="font-bold text-pink-500">{product.price}</p>
                  </div>
                  <div className="flex mt-4 items-center justify-between">
                    <div className="flex text-yellow-400">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <button className="text-gray-700 hover:text-pink-500 transition-colors">
                      <FaShoppingBag />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/products" 
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              View All Products <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>
          
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            className="max-w-4xl mx-auto"
          >
            <div className="px-12 py-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-xl italic mb-6">
                "The quality of Damas clothing is exceptional. I've never felt more confident in my outfits!"
              </p>
              <p className="font-bold">Sarah Johnson</p>
              <p className="text-pink-300">Fashion Blogger</p>
            </div>
            
            <div className="px-12 py-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-500">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-xl italic mb-6">
                "From casual wear to formal attire, Damas never disappoints. My go-to brand for all occasions."
              </p>
              <p className="font-bold">Michael Chen</p>
              <p className="text-pink-300">Loyal Customer</p>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 hover:shadow-lg rounded-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Counter */}
      <div className="relative py-24 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: "url(https://i.ibb.co/8jvyHNz/futuristic-store-with-abstract-concept-architecture-23-2150862090-transformed.jpg)" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our <span className="text-pink-400">{customers.toLocaleString()}+</span> Happy Customers
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the Damas difference and become part of our fashion-forward community
          </p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-4 bg-pink-500 hover:bg-pink-600 rounded-full text-lg font-medium transition-colors duration-300"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;