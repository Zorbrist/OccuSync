import  { useState,  } from 'react';
import type {ChangeEvent, FormEvent} from 'react'
import { registerBusiness } from '../services/authService';
import type { BusinessRegistrationPayload } from '../types/authType';

export const useRegisterBusiForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessRegNo: '',
    industry: '',
    areaOfService: '',
    state: '',
    postcode: '',
    country: '',
    businessPhone: '',
    businessEmail: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
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

    const payload: BusinessRegistrationPayload = {
      business: {
        name: formData.businessName,
        registration_no: formData.businessRegNo,
        industry: formData.industry,
        area_of_service: formData.areaOfService,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country,
        phone: formData.businessPhone,
        email: formData.businessEmail,
      },
      owner: {
        full_name: formData.ownerName,
        phone: formData.ownerPhone,
      },
      email: formData.ownerEmail, 
      password: formData.password,
    };

    try {
      setLoading(true);
      await registerBusiness(payload);
      alert('Business registered successfully!');
      // TODO: Redirect user to login page
    } catch (err: any) {
      setError(err.message);
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