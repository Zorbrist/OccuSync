import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
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
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerPhone: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
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
        first_name: formData.ownerFirstName,
        last_name: formData.ownerLastName,
        phone: formData.ownerPhone,
      },
      email: formData.ownerEmail,
      password: formData.password,
    };

    try {
      setLoading(true);
      await registerBusiness(payload);
      return true;
    } catch (err: any) {
      setError(err.message);
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