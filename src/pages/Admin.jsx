import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/product', product);
      alert('Product added successfully!');
      setProduct({ title: '', price: '', category: '', image: '', description: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="border mb-4 p-2 w-full" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border mb-4 p-2 w-full" required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="border mb-4 p-2 w-full" required />
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="border mb-4 p-2 w-full" required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border mb-4 p-2 w-full" required></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
