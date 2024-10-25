import React, { useState, useEffect } from 'react';
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

  const [products, setProducts] = useState([]); 
  const [editMode, setEditMode] = useState(false); 
  const [editProductId, setEditProductId] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState(''); // Track entered password

  const baseurl = "https://json-server-deployment-zln4.onrender.com";
  <h1>password is 12345</h1>

  const handlePasswordSubmit = () => {
    if (inputPassword === '12345') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseurl}/product`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update product if in edit mode
      try {
        await axios.put(`${baseurl}/product/${editProductId}`, product);
        alert('Product updated successfully!');
        setEditMode(false);
        setEditProductId(null);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Add new product
      try {
        await axios.post(`${baseurl}/product`, product);
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    fetchProducts();
    setProduct({ title: '', price: '', category: '', image: '', description: '', stock: '' });
  };

  const handleEdit = (product) => {
    setProduct(product);
    setEditMode(true);
    setEditProductId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${baseurl}/product/${id}`);
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // If not authenticated, show password input
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handlePasswordSubmit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Submit
        </button>
        <p className="text-gray-600 mt-2">Admin password is <strong>12345</strong></p> {/* Password hint */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      
      <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
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
          {product.image && <img src={product.image} alt="Product Preview" className="mt-4 max-w-xs" />}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-semibold">Description</label>
          <textarea id="description" name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 rounded" required></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="mb-1 font-semibold">Stock</label>
          <input type="number" id="stock" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editMode ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3 className="text-xl font-bold mt-8 mb-4">Product List</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="border-b p-4">Image</th>
            <th className="border-b p-4">Title</th>
            <th className="border-b p-4">Price</th>
            <th className="border-b p-4">Category</th>
            <th className="border-b p-4">Stock</th>
            <th className="border-b p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border-b p-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="border-b p-4">{product.title}</td>
              <td className="border-b p-4">₹{product.price}</td>
              <td className="border-b p-4">{product.category}</td>
              <td className="border-b p-4">{product.stock}</td>
              <td className="border-b p-4">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
