import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: '',
  });

  const baseurl = "https://json-server-deployment-zln4.onrender.com"

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseurl}/product`, product);
      alert('Product added successfully!');
      setProduct({ title: '', price: '', category: '', image: '', description: '', stock: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-semibold">Title</label>
          <input type="text" id="title" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 font-semibold">Price</label>
          <input type="number" id="price" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 font-semibold">Category</label>
          <input type="text" id="category" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-1 font-semibold">Image URL</label>
          <input type="text" id="image" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-semibold">Description</label>
          <textarea id="description" name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 rounded" required></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="mb-1 font-semibold">Stock</label>
          <input type="number" id="stock" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
