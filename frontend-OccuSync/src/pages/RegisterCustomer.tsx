
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRegisterCustForm } from '../hooks/useRegisterCust';
import SuccessModal from '../components/SuccessModal';

const INPUT_LABEL =
  "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 ml-1";

const INPUT_FIELD =
  "w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a0bba] focus:border-transparent transition-all shadow-sm";

const RegisterCustomer: React.FC = () => {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegisterCustForm();
    
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // IMPORTANT: Ensure your useRegisterCustForm hook's handleSubmit returns a boolean!
    // It should return true if the registration was successful.
    const isSuccess = await handleSubmit(e);
    
    // If your hook returns void, you will need to change the hook to return true on success.
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  };

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen relative flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#091540]/100 to-[#7692FF]/100">
      
      {/* Top Left Sticky Back to Home Button */}
      <div className="fixed top-6 left-6 sm:top-8 sm:left-8 z-40">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#1a0bba] bg-white/90 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border border-gray-200 transition-all hover:shadow-md"
        >
          <span className="text-lg leading-none">&larr;</span> Back to Home
        </Link>
      </div>

      <div className="max-w-[850px] w-full z-10 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mt-12 md:mt-0">

        {/* Header */}
        <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-10 md:px-12">
          <h1 className="text-4xl font-extrabold text-[#1a0bba] tracking-tight mb-3">
            Create Your Account
          </h1>

          <p className="text-gray-600 text-base max-w-2xl">
            Create your OccuSync customer account to connect with businesses
            and manage your services in one place.
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="px-8 py-10 md:px-12 space-y-10"
        >

         

          {/* Personal Details */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 border-b pb-2">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={INPUT_LABEL}>First Name</label>
                <input required type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Ali" className={INPUT_FIELD} />
              </div>

              <div>
                <label className={INPUT_LABEL}>Last Name</label>
                <input required type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Ahmad" className={INPUT_FIELD} />
              </div>

              <div>
                <label className={INPUT_LABEL}>Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ali@example.com" className={INPUT_FIELD} />
              </div>

              <div>
                <label className={INPUT_LABEL}>Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0123456789" className={INPUT_FIELD} />
              </div>
            </div>
          </section>

          {/* Location */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 border-b pb-2">
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={INPUT_LABEL}>Country</label>
                <input required type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Malaysia" className={INPUT_FIELD} />
              </div>

              <div>
                <label className={INPUT_LABEL}>State</label>
                <input required type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Selangor" className={INPUT_FIELD} />
              </div>

              <div>
                <label className={INPUT_LABEL}>Postcode</label>
                <input required type="text" name="postcode" value={formData.postcode} onChange={handleChange} placeholder="40000" className={INPUT_FIELD} />
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
               {/* Password Field with Eye Toggle */}
               <div>
                  <label className={INPUT_LABEL}>Password</label>
                  <div className="relative">
                    <input 
                      required 
                      type={showPassword ? 'text' : 'password'} 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="••••••••" 
                      className={`${INPUT_FIELD} pr-11`} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
               </div>

               {/* Confirm Password Field with Eye Toggle */}
               <div>
                  <label className={INPUT_LABEL}>Confirm Password</label>
                  <div className="relative">
                    <input 
                      required 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      name="confirmPassword" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      placeholder="••••••••" 
                      className={`${INPUT_FIELD} pr-11`} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
               </div>
            </div>

            {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium text-sm">
              {error}
            </div>
          )}
          <br />

            <div className="flex flex-col items-center space-y-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded bg-white checked:bg-[#1a0bba] focus:ring-2 focus:ring-[#1a0bba] transition-all cursor-pointer"
                  />
                </div>
                <span className="text-gray-700 text-sm select-none">
                  I agree to the <a href="#" className="text-[#1a0bba] hover:underline font-medium">Terms & Conditions</a>
                </span>
              </label>

               {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-medium text-sm">
              {error}
            </div>
          )}

              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#1a0bba] disabled:bg-gray-400 hover:bg-[#140899] active:scale-[0.98] text-white font-semibold py-3.5 px-10 rounded-xl w-full max-w-[400px] transition-all shadow-md focus:outline-none"
              >
                {loading ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>
          </section>

        </form>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal} 
        message="Welcome to OccuSync. Your customer account has been created successfully. You can now login to get started."
      />

    </div>
  );
};

export default RegisterCustomer;