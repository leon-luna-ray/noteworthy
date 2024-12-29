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
    try {
      const response = await axios.post('/auth/token/', { email, password });

      if (response.status !== 200) {
        alert('Invalid email or password');
        return;
      }

      const { token, user } = response.data;

      setSession(token);

      if (user.id) {
        setUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logOut = async () => {
    const response = await axios.post('/auth/logout/');

    if(response.status === 200) {
      setSession(null);
      setUser(null);
      navigate('/login');
    }
  };

  const signUp = async (email, password) => {
    const userData = {
      email,
      password,
    };
    const response = await fetch('http://localhost:8080/api/v1/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  });
  if(response.status === 201) {
    const data = await response.json();
    console.log('response:', data);
  }
  if (!response.ok) {
      throw new Error('Failed to register user');
  }

  // return response.json();
    // try {
    //   const response = await axios.post('/auth/register/', { email, password });
    //   console.log('response:', response);
    //   // if (response.data.user.id) {
    //   //   alert('Sign up successful. Please log in');
    //   //   logOut();
    //   //   navigate('/login');
    //   // }
    // } catch (error) {
    //   alert(`Error - ${error.response.data?.email[0]}` || 'An error occurred. Unable to sign up');
    // }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('/auth/whoami/');

      if (response.status === 200) {
        setSession(token);
        setUser(response.data);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      setSession(null);
    }
  };

  // Effects
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken && storedToken !== 'null') {
      fetchUserData(storedToken);
    }
    else {
      setSession(null);
    }
  }, []);

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