import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Filter from './Filter'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [query] = useSearchParams();

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);

  useEffect(() => {
    let sorted = [...products];
    const sortParam = query.get("sort");

    if (sortParam === "LTH") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortParam === "HTL") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (sortParam) {
      sorted = sorted.filter(product => product.category === sortParam);
    }

    setSortedProducts(sorted);
  }, [products, query]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex justify-end mb-6">
          <Filter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="block bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center mb-2">
                  <div className="text-gray-800 flex">
                    {[...Array(4)].map((star, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#3f414d"
                        className="bi bi-star"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.555 11.878c-.05 0-.1-.025-.15-.05a.277.277 0 01-.1-.275l1.098-4.092L.109 4.79c-.1-.05-.125-.175-.1-.275a.24.24 0 01.225-.174l4.242-.225L5.998.15c.05-.075.15-.15.25-.15s.2.075.225.15l1.522 3.967 4.242.225c.1 0 .2.075.225.174.025.1 0 .2-.075.275L9.093 7.46l1.098 4.092c.025.1 0 .2-.1.275-.075.05-.2.075-.274 0L6.248 9.532l-3.569 2.296c-.05.05-.075.05-.124.05z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-900 font-semibold text-lg mb-4">
                  ${product.price}
                </p>
                <button className="bg-beige-500 text-red px-4 py-2 rounded-full w-full flex items-center bg-amber-300 justify-center">
                  <img
                    src="https://banner2.cleanpng.com/20180905/wph/kisspng-computer-icons-portable-network-graphics-clip-art-ic-shopping-cart-px-svg-png-icon-free-download-1-5b907479023c32.0581863815361936570092.jpg"
                    className="w-4 h-4 mr-2"
                    alt="Add to cart"
                  />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
