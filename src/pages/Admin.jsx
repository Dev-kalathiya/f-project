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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FiEdit2, FiTrash2, FiEye, FiLock, FiPlus, FiSave, FiX } from 'react-icons/fi';

// const Admin = () => {
//   const [product, setProduct] = useState({
//     title: '',
//     price: '',
//     category: '',
//     image: '',
//     description: '',
//     stock: '',
//     discount: ''
//   });

//   const [products, setProducts] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editProductId, setEditProductId] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [inputPassword, setInputPassword] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('products');
//   const [previewImage, setPreviewImage] = useState('');

//   const baseurl = "https://json-server-deployment-zln4.onrender.com";

//   // Password protection
//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (inputPassword === '12345') {
//       setIsAuthenticated(true);
//       fetchProducts();
//     } else {
//       alert('Incorrect Password');
//       setInputPassword('');
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/product`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchProducts();
//     }
//   }, [isAuthenticated]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
    
//     if (name === 'image') {
//       setPreviewImage(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode) {
//         await axios.put(`${baseurl}/product/${editProductId}`, product);
//         toast.success('Product updated successfully!');
//       } else {
//         await axios.post(`${baseurl}/product`, product);
//         toast.success('Product added successfully!');
//       }
//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error('Error saving product:', error);
//       toast.error('Error saving product');
//     }
//   };

//   const resetForm = () => {
//     setProduct({
//       title: '',
//       price: '',
//       category: '',
//       image: '',
//       description: '',
//       stock: '',
//       discount: ''
//     });
//     setPreviewImage('');
//     setEditMode(false);
//     setEditProductId(null);
//   };

//   const handleEdit = (product) => {
//     setProduct(product);
//     setPreviewImage(product.image);
//     setEditMode(true);
//     setEditProductId(product.id);
//     setActiveTab('addEdit');
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`${baseurl}/product/${id}`);
//         fetchProducts();
//         toast.success('Product deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         toast.error('Error deleting product');
//       }
//     }
//   };

//   const filteredProducts = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Login screen
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//           <div className="text-center mb-8">
//             <FiLock className="mx-auto text-4xl text-indigo-600 mb-4" />
//             <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
//             <p className="text-gray-600 mt-2">Enter password to continue</p>
//           </div>
//           <form onSubmit={handlePasswordSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={inputPassword}
//                 onChange={(e) => setInputPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter password"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
//             >
//               <FiLock />
//               Login
//             </button>
//           </form>
//           <p className="text-center text-gray-500 text-sm mt-6">
//             Hint: The password is <span className="font-bold">12345</span>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
//           <button
//             onClick={() => setIsAuthenticated(false)}
//             className="text-sm text-red-600 hover:text-red-800"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         {/* Tabs */}
//         <div className="border-b border-gray-200 mb-6">
//           <nav className="-mb-px flex space-x-8">
//             <button
//               onClick={() => setActiveTab('products')}
//               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'products' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
//             >
//               Product List
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab('addEdit');
//                 resetForm();
//               }}
//               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'addEdit' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
//             >
//               {editMode ? 'Edit Product' : 'Add Product'}
//             </button>
//           </nav>
//         </div>

//         {/* Add/Edit Product Form */}
//         {activeTab === 'addEdit' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-900 mb-6">
//                 {editMode ? 'Edit Product' : 'Add New Product'}
//                 {editMode && (
//                   <button
//                     onClick={resetForm}
//                     className="float-right text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                   >
//                     <FiPlus /> Add New
//                   </button>
//                 )}
//               </h2>
              
//               <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div className="sm:col-span-2">
//                   <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                     Product Title
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={product.title}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                     Price (₹)
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={product.price}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
//                     Discount (%)
//                   </label>
//                   <input
//                     type="number"
//                     id="discount"
//                     name="discount"
//                     value={product.discount}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     id="category"
//                     name="category"
//                     value={product.category}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     value={product.stock}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//                     Image URL
//                   </label>
//                   <input
//                     type="text"
//                     id="image"
//                     name="image"
//                     value={product.image}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                   {previewImage && (
//                     <div className="mt-4">
//                       <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
//                       <img src={previewImage} alt="Preview" className="h-40 object-contain border rounded" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                     Description
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     rows={4}
//                     value={product.description}
//                     onChange={handleChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div className="sm:col-span-2 flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     <FiX className="mr-2" /> Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     {editMode ? (
//                       <>
//                         <FiSave className="mr-2" /> Update Product
//                       </>
//                     ) : (
//                       <>
//                         <FiPlus className="mr-2" /> Add Product
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Product List */}
//         {activeTab === 'products' && (
//           <div className="bg-white shadow rounded-lg overflow-hidden">
//             <div className="p-6">
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                 <h2 className="text-lg font-medium text-gray-900">Product Inventory</h2>
//                 <div className="w-full sm:w-auto">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Image
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Title
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Price
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Category
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Stock
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredProducts.length > 0 ? (
//                       filteredProducts.map((product) => (
//                         <tr key={product.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded object-cover" src={product.image} alt={product.title} />
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900">{product.title}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-900">₹{product.price}</div>
//                             {product.discount && (
//                               <div className="text-xs text-green-600">
//                                 {product.discount}% off
//                               </div>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-500">{product.category}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
//                               {product.stock} in stock
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <button
//                               onClick={() => handleEdit(product)}
//                               className="text-indigo-600 hover:text-indigo-900 mr-4"
//                               title="Edit"
//                             >
//                               <FiEdit2 />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(product.id)}
//                               className="text-red-600 hover:text-red-900"
//                               title="Delete"
//                             >
//                               <FiTrash2 />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
//                           No products found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Admin;
