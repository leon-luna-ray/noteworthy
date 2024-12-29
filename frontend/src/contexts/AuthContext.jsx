import axios from 'axios';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const isLoggedIn = useMemo(() => !!user, [user]);

  // Methods
  const setSession = (token) => {
    sessionStorage.setItem('token', token);
    setToken(token);
  };

  const logIn = async (email, password) => {
    const userData = new URLSearchParams();
    userData.append('username', email);
    userData.append('password', password);

    try {
      const response = await axios.post('/auth/token', userData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.status === 200) {
        const { access_token } = response.data;
        setSession(access_token);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error - ${error.response.data.detail}`);
      } else {
        alert('An error occurred. Unable to log in');
      }
    }
  };

  const logOut = () => {
    setSession(null);
    setUser(null);
    navigate('/login');
  };

  const signUp = async (email, password) => {
    try {
      const userData = { email, password };
      const response = await axios.post('/auth/register', userData);
      if (response.status === 201) {
        alert('Sign up successful. Please log in');
        logOut();
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error - ${error.response.data.detail}`);
      } else {
        alert('An error occurred. Unable to sign up');
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/whoami');
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error - ${error.response.data.detail}`);
      }
      else {
        alert('An error occurred. Unable to fetch user data');
      }
      setSession(null);
    }
  };

  // Effects
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken && storedToken !== 'null') {
      setToken(storedToken);
    } else {
      setSession(null);
    }
  }, []);
  
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const authContextValue = {
    logIn,
    logOut,
    signUp,
    isLoggedIn,
    user,
    token,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);