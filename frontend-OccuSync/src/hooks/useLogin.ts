import { useState } from 'react';
import { login } from '../services/authService';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);
    

    try {
      const data = await login({
        email,
        password,
      });

      // Store authentication data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
  };
};