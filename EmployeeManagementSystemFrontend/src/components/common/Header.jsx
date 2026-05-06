import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Features
            </a>
            <a
              href="/#integrations"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Integrations
            </a>
            <a
              href="/#customers"
              className="text-slate-600 hover:text-purple-600 transition-colors"
            >
              Customers
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              // If user is logged in
              <>
                <span className="text-slate-600 font-medium hidden sm:inline">
                  Welcome, {currentUser.personalDetails?.fullName || currentUser.name || currentUser.email}!
                </span>
                <button
                  onClick={logout}
                  className="bg-purple-100 text-purple-700 px-5 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // If user is logged out
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    className="text-slate-600 font-medium hover:text-purple-600 transition-colors flex items-center"
                  >
                    Log In
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${
                        isLoginOpen ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isLoginOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to="/login/admin"
                        className="block px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        Admin Login
                      </Link>
                      <Link
                        to="/login/employee"
                        className="block px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-600"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        Employee Login
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/signup/admin"
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm"
                >
                  Admin Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;