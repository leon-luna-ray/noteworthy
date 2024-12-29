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
      const userData = new URLSearchParams();
      userData.append('username', email);
      userData.append('password', password);

      const response = await axios.post('/auth/token', userData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('response:', response);

      if (response.status === 200) {
        const { access_token } = response.data;
        setSession(access_token);

        // if (user.id) {
        //   setUser(user);
        //   navigate('/dashboard');
        // }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        alert(`Error - ${error.response.data.detail}`);
      } else {
        alert('An error occurred. Unable to log in');
      }
    }
  };

  const logOut = async () => {
    const response = await axios.post('/auth/logout/');

    if (response.status === 200) {
      setSession(null);
      setUser(null);
      navigate('/login');
    }
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
      const response = await axios.get('/auth/whoami/');
      console.log('response:', response);
      if (response.status === 200) {
        // setSession(token);
        setUser(response.data);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      setSession(null);
    }
  };

  // Effects
  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

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