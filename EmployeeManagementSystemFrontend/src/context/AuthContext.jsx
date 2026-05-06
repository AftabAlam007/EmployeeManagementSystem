import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, signup as apiSignup } from '../services/authService'; // 1. Use authService

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state
  const navigate = useNavigate();

  // 2. Restore session and manage loading state
  useEffect(() => {
    try {
      const user = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      if (user && token) {
        setCurrentUser(JSON.parse(user));
        setIsAuthenticated(true);
      }
    } catch (error) {
        // In case of parsing error, etc.
        console.error("Failed to restore session:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
    } finally {
        setIsLoading(false); // 3. Set loading to false after check
    }
  }, []);

  // 3. Refined Login Logic
  const login = async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      if (response && response.token) {
        const user = { email: response.email, role: response.role };
        
        // Store in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Set state
        setCurrentUser(user);
        setIsAuthenticated(true);

        // Navigate based on role
        if (user.role === 'ROLE_ADMIN') {
          navigate('/dashboard/admin');
        } else if (user.role === 'ROLE_EMPLOYEE') {
          navigate('/dashboard/employee');
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  // 4. Logout Function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const adminSignup = async (email, password) => {
    try {
      const response = await apiSignup({ email, password, role: 'ADMIN' });
      // After successful signup, navigate to login page
      if(response) {
        navigate('/login/admin');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin signup failed:', error);
      return false;
    }
  };

  const value = { currentUser, isAuthenticated, isLoading, login, logout, adminSignup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};