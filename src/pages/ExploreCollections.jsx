import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaSearch, FaStar, FaShoppingBag } from "react-icons/fa";
import Footer from "../components/Footer";

const ExploreCollections = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample collection data
  const collections = [
    {
      id: 1,
      title: "Urban Elegance",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&auto=format&fit=crop&q=60",
      category: "men",
      items: 28,
      rating: 4.8
    },
    {
      id: 2,
      title: "Summer Breeze",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&auto=format&fit=crop&q=60",
      category: "women",
      items: 42,
      rating: 4.9
    },
    {
      id: 3,
      title: "Formal Attire",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=600&auto=format&fit=crop&q=60",
      category: "men",
      items: 15,
      rating: 4.7
    },
    {
      id: 4,
      title: "Evening Glow",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&auto=format&fit=crop&q=60",
      category: "women",
      items: 36,
      rating: 4.9
    },
    {
      id: 5,
      title: "Streetwear Essentials",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60",
      category: "unisex",
      items: 54,
      rating: 4.6
    },
    {
      id: 6,
      title: "Winter Comfort",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=60",
      category: "unisex",
      items: 31,
      rating: 4.8
    },
    {
      id: 7,
      title: "Beach Vibes",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&auto=format&fit=crop&q=60",
      category: "women",
      items: 22,
      rating: 4.7
    },
    {
      id: 8,
      title: "Business Casual",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=600&auto=format&fit=crop&q=60",
      category: "men",
      items: 19,
      rating: 4.5
    }
  ];

  // Filter collections based on active filter and search query
  const filteredCollections = collections.filter(collection => {
    const matchesFilter = activeFilter === "all" || collection.category === activeFilter;
    const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=60')] bg-cover bg-center opacity-50"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Explore Collections</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our carefully curated fashion collections for every occasion
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search collections..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700 flex items-center">
              <FaFilter className="mr-2" /> Filter:
            </span>
            <div className="flex space-x-2">
              {["all", "men", "women", "unisex"].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full capitalize ${activeFilter === filter ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        {filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCollections.map((collection) => (
              <div key={collection.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <Link to={`/collections/${collection.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <button className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white text-center rounded-lg font-medium transition-colors duration-300">
                        View Collection
                      </button>
                    </div>
                  </div>
                </Link>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{collection.title}</h3>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs capitalize">
                      {collection.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{collection.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{collection.items} items</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No collections found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            <FaShoppingBag className="mr-2" /> View All Products
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExploreCollections;