import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const { logIn } = useAuth();

  // State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Methods
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn(formData.email, formData.password);

    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div id="login" className="flex flex-col-2 justify-center items-center">
      <div className="flex flex-col gap-y-[2rem] bg-green-400 px-[6rem] py-[4rem] rounded-md">
        <h1 className="text-center text-[3rem]">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-[1rem]">
          <div className="flex flex-col gap-y-[0.5rem]">
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              id="email"
              className="border"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-y-[0.5rem]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
      <div className="signup-link text-[0.75rem]">
          <p>Don't have an account?</p>
          <p><Link to='/signup' className='underline'>Click here</Link> to sign up!</p>
        </div>
    </div>
  );
};

export default LoginPage;