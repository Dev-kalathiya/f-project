import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error || 'Invalid email or password');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-200 to-indigo-400 px-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-700 justify-center items-center p-6">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/app-login-security-illustration-download-in-svg-png-gif-file-formats--online-e-banking-internet-bank-credit-card-payment-cyber-pack-device-illustrations-4077880.png?f=webp"
            alt="Login"
            className="w-80"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input with Show/Hide Option */}
            <div className="relative">
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Login
            </button>

            {/* Don't have an account? */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Login;
