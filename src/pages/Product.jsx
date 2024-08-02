import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="block bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="h-48 flex items-center justify-center">
                <img src={product.image} alt={product.title} className="h-full object-contain" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center mb-2">
                  <div className="text-yellow-500 flex">
                    {[...Array(5)].map((star, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l.082-.03 4.39-2.256 4.39 2.256a.565.565 0 0 0 .743-.593l-.082-.03L11.53 10.97l3.464-3.385a.565.565 0 0 0-.321-.953l-.094-.01-4.59-.665-2.037-4.132a.565.565 0 0 0-.854 0l-2.037 4.132-4.59.665a.565.565 0 0 0-.415.963l.084.07 3.464 3.385-1.122 4.89zM8 12.774l-3.668 1.883 1.122-4.89-3.464-3.385 4.59-.665L8 2.223l2.037 4.132 4.59.665-3.464 3.385 1.122 4.89L8 12.774z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-900 font-semibold text-lg mb-4">${product.price}</p>
                <button className="bg-beige-500 text-red px-4 py-2 rounded-full w-full flex items-center bg-amber-300 justify-center">
                  <img src="https://banner2.cleanpng.com/20180905/wph/kisspng-computer-icons-portable-network-graphics-clip-art-ic-shopping-cart-px-svg-png-icon-free-download-1-5b907479023c32.0581863815361936570092.jpg" className="w-4 h-4 mr-2" alt="Add to cart" />
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
