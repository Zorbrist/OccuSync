import { useState, type FormEvent } from "react";
import { Eye, EyeOff, ArrowLeft, ArrowRight, ShieldCheck, Building2, UserRound, CheckCircle2, CircleDot, ClipboardCheck, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useRegisterBusiForm } from "../hooks/useRegisterBusi";
import SuccessModal from "../components/SuccessModal";

const INPUT_LABEL = "block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1";
const INPUT_FIELD = "w-full py-3.5 px-4 rounded-[1rem] bg-[#F1F5F9] shadow-inner border-none text-[#1E293B] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all duration-300";

const RegisterBusiness = () => {
  const { formData, error, loading, handleChange, handleSubmit } = useRegisterBusiForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;
  const stepProgress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Company Details", description: "Business information" },
    { number: 2, title: "Owner Details", description: "Primary contact" },
    { number: 3, title: "Security", description: "Account protection" },
  ];

  const validateStep = (step: number) => {
    if (step === 1) return formData.businessName.trim() !== "" && formData.businessRegNo.trim() !== "" && formData.industry.trim() !== "" && formData.state.trim() !== "" && formData.postcode.trim() !== "" && formData.country.trim() !== "" && formData.businessPhone.trim() !== "" && formData.businessEmail.trim() !== "";
    if (step === 2) return formData.ownerName.trim() !== "" && formData.ownerEmail.trim() !== "" && formData.ownerPhone.trim() !== "";
    if (step === 3) return formData.password !== "" && formData.confirmPassword !== "" && formData.password === formData.confirmPassword && formData.termsAgreed;
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    if (await handleSubmit(e)) setShowSuccessModal(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E8EDF2] font-sans">
      <Link to="/" className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500 transition-all hover:text-black hover:shadow-md">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT SIDE */}
          <section className="hidden lg:block pl-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-50">
              <CircleDot className="h-3.5 w-3.5 text-slate-800" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">OCCUSYNC PLATFORM</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-[#1E293B] xl:text-6xl mb-6">
              Grow your<br />business.
            </h1>
            <p className="text-lg leading-relaxed text-slate-500 max-w-md">
              Bring your customers, team and service operations together through one streamlined platform built for modern service businesses.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <Building2 className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Centralized management</p>
                  <p className="mt-1 text-sm text-slate-500">Manage your business information and operations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <ClipboardCheck className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Streamlined workflows</p>
                  <p className="mt-1 text-sm text-slate-500">Organize quotations, orders, and service activities.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-[#1E293B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E293B]">Verified presence</p>
                  <p className="mt-1 text-sm text-slate-500">Build trust and connect with customers.</p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE FORM */}
          <section className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-[2.5rem] bg-[#F1F5F9] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(149,157,165,0.15)] border border-slate-50 p-8 sm:p-10">

              {/* Progress Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Join OccuSync</h2>
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
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">Company Details</h3>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="businessName" className={INPUT_LABEL}>Business Name</label>
                        <input required id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Apex Services" className={INPUT_FIELD} />
                      </div>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="businessRegNo" className={INPUT_LABEL}>Registration No.</label>
                          <input required id="businessRegNo" name="businessRegNo" value={formData.businessRegNo} onChange={handleChange} placeholder="12345678-X" className={INPUT_FIELD} />
                        </div>
                        <div>
                          <label htmlFor="industry" className={INPUT_LABEL}>Industry</label>
                          <div className="relative">
                            <select required id="industry" name="industry" value={formData.industry} onChange={handleChange} className={`${INPUT_FIELD} appearance-none pr-10 cursor-pointer`}>
                              <option value="" disabled>Select industry</option>
                              <option value="HVAC">HVAC</option>
                              <option value="Construction">Construction</option>
                              <option value="Energy">Energy</option>
                              <option value="Logistics">Logistics</option>
                              <option value="Plumbing">Plumbing</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                          <label htmlFor="state" className={INPUT_LABEL}>State</label>
                          <input required id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Selangor" className={INPUT_FIELD} />
                        </div>
                        <div>
                          <label htmlFor="postcode" className={INPUT_LABEL}>Postcode</label>
                          <input required id="postcode" name="postcode" value={formData.postcode} onChange={handleChange} placeholder="40000" className={INPUT_FIELD} />
                        </div>
                        <div>
                          <label htmlFor="country" className={INPUT_LABEL}>Country</label>
                          <input required id="country" name="country" value={formData.country} onChange={handleChange} placeholder="Malaysia" className={INPUT_FIELD} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="businessPhone" className={INPUT_LABEL}>Phone</label>
                          <input required id="businessPhone" name="businessPhone" type="tel" value={formData.businessPhone} onChange={handleChange} placeholder="012-345 6789" className={INPUT_FIELD} />
                        </div>
                        <div>
                          <label htmlFor="businessEmail" className={INPUT_LABEL}>Email</label>
                          <input required id="businessEmail" name="businessEmail" type="email" value={formData.businessEmail} onChange={handleChange} placeholder="hello@company.com" className={INPUT_FIELD} />
                        </div>
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
                    <h3 className="text-lg font-semibold text-[#1E293B] mb-6 border-b border-slate-100 pb-4">Owner Details</h3>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="ownerName" className={INPUT_LABEL}>Full Name</label>
                        <input required id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="John Doe" className={INPUT_FIELD} />
                      </div>
                      <div>
                        <label htmlFor="ownerEmail" className={INPUT_LABEL}>Email Address</label>
                        <input required id="ownerEmail" name="ownerEmail" type="email" value={formData.ownerEmail} onChange={handleChange} placeholder="john@company.com" className={INPUT_FIELD} />
                      </div>
                      <div>
                        <label htmlFor="ownerPhone" className={INPUT_LABEL}>Phone Number</label>
                        <input required id="ownerPhone" name="ownerPhone" type="tel" value={formData.ownerPhone} onChange={handleChange} placeholder="012-345 6789" className={INPUT_FIELD} />
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
                          <input required id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Create password" className={`${INPUT_FIELD} pr-12`} />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className={INPUT_LABEL}>Confirm Password</label>
                        <div className="relative">
                          <input required id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" className={`${INPUT_FIELD} pr-12`} />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <label className="flex items-center gap-3 pt-2 cursor-pointer">
                        <input required type="checkbox" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} className="w-4 h-4 rounded border-slate-300 text-black focus:ring-black" />
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

      <SuccessModal isOpen={showSuccessModal} title="Business Registered!" message="Your account has been submitted successfully." />
    </div>
  );
};

export default RegisterBusiness;