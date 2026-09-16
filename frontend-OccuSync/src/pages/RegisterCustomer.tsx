import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, ClipboardCheck, Users, CheckCircle2, CircleDot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRegisterCustForm } from '../hooks/useRegisterCust';
import SuccessModal from '../components/SuccessModal';

const INPUT_LABEL = "block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1";
const INPUT_FIELD = "w-full py-3.5 px-4 rounded-[1rem] bg-[#F1F5F9] shadow-inner border-none text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all duration-300";

export default function RegisterCustomer() {
  const { formData, error, loading, handleChange, handleSubmit } = useRegisterCustForm();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;
  const stepProgress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number) => {
    if (step === 1) return formData.first_name.trim() !== "" && formData.last_name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
    if (step === 2) return formData.country.trim() !== "" && formData.state.trim() !== "" && formData.postcode.trim() !== "";
    if (step === 3) return formData.password !== "" && formData.confirmPassword !== "" && formData.password === formData.confirmPassword && formData.termsAgreed;
    return true;
  };

  const handleNext = () => { if (validateStep(currentStep) && currentStep < totalSteps) setCurrentStep((prev) => prev + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep((prev) => prev - 1); };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    if (await handleSubmit(e)) setShowSuccessModal(true);
  };

  const steps = [
    { number: 1, title: 'Personal Details', description: 'Basic information' },
    { number: 2, title: 'Location', description: 'Where you are based' },
    { number: 3, title: 'Security', description: 'Protect your account' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#E8EDF2] font-sans">
      <Link to="/" className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:text-black hover:shadow-md">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT SIDE */}
          <section className="hidden lg:block pl-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-50">
              <CircleDot className="h-3.5 w-3.5 text-slate-800" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">OCCUSYNC CUSTOMER</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-[#1E293B] xl:text-6xl mb-6">
              Find services.<br />Book with ease.
            </h1>
            <p className="text-lg leading-relaxed text-slate-500 max-w-md">
              Connect with trusted service providers, compare options, and manage your requests from one centralized dashboard.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <Users className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Find the right service</p>
                  <p className="mt-1 text-sm text-slate-500">Browse categories and discover matched providers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <ClipboardCheck className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Manage requests</p>
                  <p className="mt-1 text-sm text-slate-500">Track quotations, bookings, and active jobs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Stay secure</p>
                  <p className="mt-1 text-sm text-slate-500">Communicate safely with verified providers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE FORM */}
          <section className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-[2.5rem] bg-[#F1F5F9] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(149,157,165,0.15)] border border-slate-50 p-8 sm:p-10">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Create Account</h2>
                <div className="mt-6 flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Step {currentStep} of {totalSteps}</span>
                  <span className="text-[11px] font-semibold text-slate-400">{Math.round(stepProgress)}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full bg-[#1E293B] transition-all duration-500" style={{ width: `${stepProgress}%` }} />
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_8px_24px_rgba(149,157,165,0.05)]">
                
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">Personal Details</h3>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="first_name" className={INPUT_LABEL}>First Name</label>
                          <input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="John" className={INPUT_FIELD} required />
                        </div>
                        <div>
                          <label htmlFor="last_name" className={INPUT_LABEL}>Last Name</label>
                          <input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Doe" className={INPUT_FIELD} required />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className={INPUT_LABEL}>Email Address</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" className={INPUT_FIELD} required />
                      </div>
                      <div>
                        <label htmlFor="phone" className={INPUT_LABEL}>Phone Number</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="012-345 6789" className={INPUT_FIELD} required />
                      </div>
                      <button type="button" onClick={handleNext} className="w-full rounded-[1rem] bg-black py-4 mt-8 text-sm font-semibold text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">Location</h3>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="country" className={INPUT_LABEL}>Country</label>
                        <input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Malaysia" className={INPUT_FIELD} required />
                      </div>
    
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="state" className={INPUT_LABEL}>State</label>
                          <input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Selangor" className={INPUT_FIELD} required />
                        </div>
                        <div>
                          <label htmlFor="postcode" className={INPUT_LABEL}>Postcode</label>
                          <input id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} placeholder="40000" className={INPUT_FIELD} required />
                        </div>
                      </div>
                      
                      <div className="mt-8 flex gap-3">
                        <button type="button" onClick={handleBack} className="w-1/3 rounded-[1rem] border border-slate-200 bg-white py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                        <button type="button" onClick={handleNext} className="w-2/3 rounded-[1rem] bg-black py-4 text-sm font-semibold text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">Security</h3>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="password" className={INPUT_LABEL}>Password</label>
                        <div className="relative">
                          <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create password" className={`${INPUT_FIELD} pr-12`} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className={INPUT_LABEL}>Confirm Password</label>
                        <div className="relative">
                          <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" className={`${INPUT_FIELD} pr-12`} required />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <label className="flex items-center gap-3 pt-2 cursor-pointer">
                        <input type="checkbox" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-black focus:ring-black" required />
                        <span className="text-xs text-slate-500">I agree to the <span className="font-semibold text-black">Terms & Conditions</span></span>
                      </label>

                      {error && <div className="rounded-[1rem] bg-red-50 p-4 text-sm text-red-500 text-center font-medium border border-red-100">{error}</div>}

                      <div className="mt-8 flex gap-3">
                        <button type="button" onClick={handleBack} className="w-1/3 rounded-[1rem] border border-slate-200 bg-white py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Back</button>
                        <button type="submit" disabled={loading} className="w-2/3 rounded-[1rem] bg-black py-4 text-sm font-semibold text-white hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.2)]">
                          {loading ? 'Submitting...' : <><CheckCircle2 className="w-4 h-4" /> Create Account</>}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-8 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Already registered? <Link to="/login" className="text-black hover:text-slate-600">Sign in</Link>
                </p>
              </form>

            </div>
          </section>

        </div>
      </main>

      <SuccessModal isOpen={showSuccessModal} title="Welcome to OccuSync" message="Your account has been created successfully." />
    </div>
  );
}