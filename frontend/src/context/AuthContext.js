import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUserType = localStorage.getItem('userType');
      const storedUserInfo = localStorage.getItem('userInfo');

      if (token && storedUserType && storedUserInfo) {
        try {
          const userInfo = JSON.parse(storedUserInfo);
          setUser(userInfo);
          setUserType(storedUserType);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing stored user info:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, type, token) => {
    console.log('AuthContext login called with:', { userData, type, token });
    
    // Store in localStorage
    localStorage.setItem('userType', type);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    // Update state
    setUser(userData);
    setUserType(type);
    setIsAuthenticated(true);
    
    console.log('AuthContext state updated:', { isAuthenticated: true, userType: type });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userInfo');
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  const isEmployee = () => userType === 'employee';
  const isAdmin = () => userType === 'admin';

  const value = {
    user,
    userType,
    isAuthenticated,
    loading,
    login,
    logout,
    isEmployee,
    isAdmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};