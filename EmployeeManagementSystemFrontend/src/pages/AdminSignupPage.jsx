// src/pages/AdminSignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AdminSignupForm from '../components/auth/AdminSignupForm';
import Logo from '../components/common/Logo';

const AdminSignupPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
          Admin Registration
        </h2>
        
        <AdminSignupForm />
        
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login/admin" className="font-medium text-purple-600 hover:text-purple-800">
              Log in
            </Link>
          </p>
          <Link to="/" className="text-sm text-purple-600 hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;