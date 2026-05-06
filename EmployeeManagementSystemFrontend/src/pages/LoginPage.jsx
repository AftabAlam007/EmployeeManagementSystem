import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { role } = useParams(); // Get role from URL

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dynamically set title based on role
  const title = role === 'admin' ? 'Admin Login' : 'Employee Login';
  const emailLabel = 'Email';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <Logo />
      </motion.div>
      
      <motion.div
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
          {title}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              {emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-slate-600 hover:text-slate-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
          >
            Log In
          </button>
        </form>
        
        <div className="text-center mt-6 space-y-2">
          {role === 'admin' && (
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/signup/admin" className="font-medium text-purple-600 hover:text-purple-800">
                Sign up
              </Link>
            </p>
          )}
          <Link to="/" className="text-sm text-purple-600 hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;