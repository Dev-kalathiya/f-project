import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const getSingleProduct = async (id) => {
    let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 ">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-center">
          <img src={product.image} alt={product.title} className="w-full max-w-xs object-contain mb-6"/>
          <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
          <p className="text-gray-900 font-semibold text-lg mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button className="bg-amber-300 text-red px-2 py-2 rounded-full w-96 flex items-center justify-center">
            <img src="https://banner2.cleanpng.com/20180905/wph/kisspng-computer-icons-portable-network-graphics-clip-art-ic-shopping-cart-px-svg-png-icon-free-download-1-5b907479023c32.0581863815361936570092.jpg" className="w-4 h-4 mr-2" alt="Add to cart" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
