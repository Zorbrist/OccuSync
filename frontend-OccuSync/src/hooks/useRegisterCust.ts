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

  const handleSubmit = async (e: FormEvent): Promise<boolean> => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }

    if (!formData.termsAgreed) {
      setError('You must agree to the Terms & Conditions.');
      return false;
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

      // Return true to trigger the success modal in the component
      return true;

    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Registration failed. Please try again.'
      );
      return false;
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