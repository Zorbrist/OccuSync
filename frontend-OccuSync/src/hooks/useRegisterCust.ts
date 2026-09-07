import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { registerCustomer } from '../services/authService';
import type { CustomerRegistrationPayload } from '../types/authType';

export const useRegisterCustForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    postcode: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }

    if (!formData.termsAgreed) {
      return setError('You must agree to the Terms & Conditions.');
    }

    const payload: CustomerRegistrationPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      postcode: formData.postcode,
      password: formData.password,
    };

    try {
      setLoading(true);

      await registerCustomer(payload);

      alert('Account registered successfully!');

    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};