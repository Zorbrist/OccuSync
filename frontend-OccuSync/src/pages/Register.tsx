import React from 'react';

// Define reusable class strings here instead of @apply in CSS
const INPUT_LABEL = "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 ml-1";
const INPUT_FIELD = "w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a0bba] focus:border-transparent transition-all shadow-sm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen relative flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-[850px] w-full z-10 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-10 md:px-12">
          <h1 className="text-4xl font-extrabold text-[#1a0bba] tracking-tight mb-3">
            Join OccuSync
          </h1>
          <p className="text-gray-600 text-base max-w-2xl">
            Bring your customers, team, and service operations together in one centralized platform.
          </p>
          <div className="mt-4 inline-block bg-blue-50 py-1.5 px-4 rounded-full border border-blue-100">
            <p className="text-sm text-gray-700 font-medium">
              Checking application status? <a href="#" className="text-[#1a0bba] font-bold hover:underline">Click here</a>
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form className="px-8 py-10 md:px-12 space-y-10">
          
          {/* Company Details */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5 border-b pb-2">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={INPUT_LABEL}>Business Name</label>
                <input type="text" placeholder="e.g. Apex Plumbing Services" className={INPUT_FIELD} />
              </div>
              
              <div>
                <label className={INPUT_LABEL}>Business Registration No.</label>
                <input type="text" placeholder="e.g. 12345678-X" className={INPUT_FIELD} />
              </div>
              <div>
                <label className={INPUT_LABEL}>Industry</label>
                <input type="text" placeholder="e.g. Plumbing, Electrical" className={INPUT_FIELD} />
              </div>

              <div className="md:col-span-2">
                <label className={INPUT_LABEL}>Area of Service</label>
                <input type="text" placeholder="e.g. Klang Valley" className={INPUT_FIELD} />
              </div>
              
              {/* Address Grid */}
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div>
                  <label className={INPUT_LABEL}>State</label>
                  <input type="text" placeholder="Selangor" className={INPUT_FIELD} />
                </div>
                <div>
                  <label className={INPUT_LABEL}>Postcode</label>
                  <input type="text" placeholder="41200" className={INPUT_FIELD} />
                </div>
                <div>
                  <label className={INPUT_LABEL}>Country</label>
                  <input type="text" placeholder="Malaysia" className={INPUT_FIELD} />
                </div>
               
              </div>

              <div className="mt-2">
                <label className={INPUT_LABEL}>Business Phone</label>
                <input type="tel" placeholder="+60 12-345 6789" className={INPUT_FIELD} />
              </div>
              <div className="mt-2">
                <label className={INPUT_LABEL}>Business Email</label>
                <input type="email" placeholder="contact@company.com" className={INPUT_FIELD} />
              </div>
            </div>
          </section>

          {/* Owner Details */}
          <section>
            <div className="flex justify-between items-end mb-5 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-900">Owner Details</h2>
              <a href="#" className="text-sm font-semibold text-[#1a0bba] hover:underline">
                Upload Documents
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={INPUT_LABEL}>Full Name</label>
                <input type="text" placeholder="John Doe" className={INPUT_FIELD} />
              </div>
              <div>
                <label className={INPUT_LABEL}>Email Address</label>
                <input type="email" placeholder="john@company.com" className={INPUT_FIELD} />
              </div>
              <div>
                <label className={INPUT_LABEL}>Phone Number</label>
                <input type="tel" placeholder="+60 12-345 6789" className={INPUT_FIELD} />
              </div>
            </div>
          </section>

          {/* Security & Submit Section */}
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
               <div>
                  <label className={INPUT_LABEL}>Password</label>
                  <input type="password" placeholder="••••••••" className={INPUT_FIELD} />
               </div>
               <div>
                  <label className={INPUT_LABEL}>Confirm Password</label>
                  <input type="password" placeholder="••••••••" className={INPUT_FIELD} />
               </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded bg-white checked:bg-[#1a0bba] checked:border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[#1a0bba] transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm select-none group-hover:text-gray-900 transition-colors">
                  I agree to the <a href="#" className="text-[#1a0bba] hover:underline font-medium">Terms & Conditions</a> and <a href="#" className="text-[#1a0bba] hover:underline font-medium">Privacy Policy</a>
                </span>
              </label>

              <button 
                type="submit" 
                className="bg-[#1a0bba] hover:bg-[#140899] active:scale-[0.98] text-white font-semibold py-3.5 px-10 rounded-xl w-full max-w-[400px] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                Submit for Verification
              </button>

              <p className="text-sm text-gray-600 font-medium pt-2">
                Already have an account? <a href="#" className="text-[#1a0bba] font-bold hover:underline ml-1">Log In</a>
              </p>
            </div>
          </section>

        </form>
      </div>

      <div className="absolute bottom-4 text-center text-xs text-gray-500 w-full font-medium">
        Your Information is handled securely and used for verification purposes only.
      </div>
    </div>
  );
};

export default Register;