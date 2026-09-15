import { useState, type FormEvent } from 'react';
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
  Users,
  CheckCircle2,
  Sparkles,
  CircleDot,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useRegisterCustForm } from '../hooks/useRegisterCust';
import SuccessModal from '../components/SuccessModal';

const INPUT_LABEL =
  'block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em] mb-2 ml-1';

const INPUT_FIELD =
  'w-full py-3.5 px-4 rounded-xl bg-[#100d19]/80 border border-white/[0.09] text-white placeholder-slate-600 focus:bg-[#15101f] focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-400/50 transition-all duration-300';

export default function RegisterCustomer() {
  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useRegisterCustForm();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;

  const stepProgress = (currentStep / totalSteps) * 100;

  // ============================================================
  // STEP VALIDATION
  // ============================================================

  const validateStep = (step: number) => {
    if (step === 1) {
      if (
        !formData.first_name.trim() ||
        !formData.last_name.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim()
      ) {
        return false;
      }

      return true;
    }

    if (step === 2) {
      if (
        !formData.country.trim() ||
        !formData.state.trim() ||
        !formData.postcode.trim()
      ) {
        return false;
      }

      return true;
    }

    if (step === 3) {
      if (
        !formData.password ||
        !formData.confirmPassword ||
        !formData.termsAgreed
      ) {
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        return false;
      }

      return true;
    }

    return true;
  };

  // ============================================================
  // NEXT STEP
  // ============================================================

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // ============================================================
  // PREVIOUS STEP
  // ============================================================

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ============================================================
  // FINAL SUBMIT
  // ============================================================

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    const isSuccess = await handleSubmit(e);

    if (isSuccess) {
      setShowSuccessModal(true);
    }
  };

  // ============================================================
  // STEP INFORMATION
  // ============================================================

  const steps = [
    {
      number: 1,
      title: 'Personal Details',
      description: 'Basic information',
    },
    {
      number: 2,
      title: 'Location',
      description: 'Where you are based',
    },
    {
      number: 3,
      title: 'Security',
      description: 'Protect your account',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#05030a] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-[300px] -right-[200px] h-[800px] w-[800px] rounded-full bg-violet-700/[0.14] blur-[180px]" />

        <div className="absolute -bottom-[300px] -left-[250px] h-[750px] w-[750px] rounded-full bg-fuchsia-900/[0.12] blur-[180px]" />

        <div className="absolute left-[35%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-800/[0.07] blur-[150px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '65px 65px',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute left-[20%] top-[10%] h-[700px] w-[700px] rounded-full border border-violet-400/[0.025]" />

        <div className="absolute left-[22%] top-[13%] h-[540px] w-[540px] rounded-full border border-purple-400/[0.025]" />

        {/* Ambient dots */}
        <div className="absolute left-[8%] top-[25%] h-1 w-1 rounded-full bg-violet-300/60 shadow-[0_0_14px_rgba(139,92,246,0.8)]" />

        <div className="absolute left-[43%] top-[15%] h-1.5 w-1.5 rounded-full bg-fuchsia-300/50 shadow-[0_0_18px_rgba(232,121,249,0.8)]" />

        <div className="absolute right-[8%] top-[35%] h-1 w-1 rounded-full bg-violet-300/50 shadow-[0_0_15px_rgba(139,92,246,0.7)]" />

        <div className="absolute right-[18%] bottom-[18%] h-1.5 w-1.5 rounded-full bg-purple-300/40" />

      </div>

      {/* =========================================================
          BACK TO HOME
      ========================================================= */}
      <Link
        to="/"
        className="fixed left-5 top-5 z-50 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0b0913]/70 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.05] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] items-center px-5 py-24 sm:px-8 lg:px-12">

        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}
<section className="relative hidden lg:block">
  <div className="max-w-xl">

    {/* Label */}
    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-white/[0.025] px-4 py-2 backdrop-blur-xl">
      <CircleDot className="h-3.5 w-3.5 text-violet-300" />

      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
        OCCUSYNC FOR CUSTOMERS
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
      Find services.
      <br />

      <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
        Book with confidence.
      </span>

      <br />

      Stay in control.
    </h1>

    {/* Description */}
    <p className="mt-7 max-w-lg text-sm leading-7 text-slate-500">
      Connect with trusted service providers, compare your options,
      and manage your service requests — all from one place.
    </p>

    {/* Customer Features */}
    <div className="mt-10 space-y-5">

      {/* Feature 1 */}
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/[0.10] bg-violet-500/[0.08]">
          <Users className="h-4 w-4 text-violet-300" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">
            Find the right service
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Browse service categories and discover providers
            that match your needs.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-400/[0.10] bg-purple-500/[0.08]">
          <ClipboardCheck className="h-4 w-4 text-purple-300" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">
            Manage your requests
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Keep track of quotations, bookings, service
            progress and completed jobs.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-fuchsia-400/[0.10] bg-fuchsia-500/[0.08]">
          <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-200">
            Stay connected
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Communicate with service providers and keep
            your service information in one place.
          </p>
        </div>
      </div>

    </div>
  </div>

  {/* Network visual */}
  <div className="pointer-events-none absolute -bottom-28 -left-20 h-[330px] w-[620px] opacity-70">
    <svg
      viewBox="0 0 620 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="registerLineGradient"
          x1="0"
          y1="0"
          x2="620"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="#8B5CF6"
            stopOpacity="0"
          />

          <stop
            offset="0.5"
            stopColor="#A78BFA"
            stopOpacity="0.45"
          />

          <stop
            offset="1"
            stopColor="#E879F9"
            stopOpacity="0"
          />
        </linearGradient>

        <filter
          id="registerGlow"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur
            stdDeviation="4"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M30 270C130 220 105 115 220 140C315 161 310 60 430 85C500 100 535 50 600 25"
        stroke="url(#registerLineGradient)"
        strokeWidth="1"
      />

      <path
        d="M10 310C115 280 145 190 245 215C340 240 380 135 465 165C525 185 555 145 610 125"
        stroke="url(#registerLineGradient)"
        strokeWidth="1"
      />

      <path
        d="M80 185C155 165 165 65 285 105C390 140 425 25 555 65"
        stroke="url(#registerLineGradient)"
        strokeWidth="1"
      />

      <circle
        cx="220"
        cy="140"
        r="3"
        fill="#A78BFA"
        filter="url(#registerGlow)"
      />

      <circle
        cx="430"
        cy="85"
        r="3"
        fill="#C084FC"
        filter="url(#registerGlow)"
      />

      <circle
        cx="245"
        cy="215"
        r="2.5"
        fill="#8B5CF6"
        filter="url(#registerGlow)"
      />

      <circle
        cx="465"
        cy="165"
        r="3"
        fill="#E879F9"
        filter="url(#registerGlow)"
      />

      <circle
        cx="285"
        cy="105"
        r="2.5"
        fill="#A78BFA"
        filter="url(#registerGlow)"
      />
    </svg>
  </div>

  {/* Floating status */}
  <div className="absolute bottom-0 right-4 w-56 rounded-2xl border border-white/[0.08] bg-[#0c0a14]/75 p-4 shadow-2xl shadow-purple-950/30 backdrop-blur-xl">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
          Customer Account
        </p>

        <p className="mt-1 text-sm font-semibold text-white">
          Ready to get started
        </p>
      </div>

      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      </div>
    </div>

    <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
      <div className="h-full w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
    </div>
  </div>
</section>
          {/* =====================================================
              RIGHT SIDE — FORM
          ===================================================== */}
          <section className="w-full">

            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#090711]/90 shadow-2xl shadow-purple-950/30 backdrop-blur-2xl">

              {/* Top accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

              {/* =================================================
                  HEADER
              ================================================= */}
              <div className="border-b border-white/[0.07] px-7 py-8 sm:px-9">

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Customer Registration
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      Create your account
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Start managing your services with OccuSync.
                    </p>

                  </div>

                  {/* Sparkle without background */}
                  <div className="hidden shrink-0 pt-1 sm:block">
                    <Sparkles className="h-5 w-5 text-violet-300" />
                  </div>

                </div>

                {/* =================================================
                    INTERACTIVE PROGRESS
                ================================================= */}
                <div className="mt-7">

                  <div className="mb-3 flex items-center justify-between">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                      Step {currentStep} of {totalSteps}
                    </span>

                    <span className="text-[10px] font-medium text-slate-500">
                      {Math.round(stepProgress)}% complete
                    </span>

                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(139,92,246,0.35)] transition-all duration-500"
                      style={{
                        width: `${stepProgress}%`,
                      }}
                    />

                  </div>

                  {/* Step indicators */}
                  <div className="mt-5 grid grid-cols-3 gap-2">

                    {steps.map((step) => {

                      const isActive =
                        currentStep === step.number;

                      const isCompleted =
                        currentStep > step.number;

                      return (
                        <button
                          key={step.number}
                          type="button"
                          onClick={() => {
                            if (
                              isCompleted ||
                              isActive
                            ) {
                              setCurrentStep(step.number);
                            }
                          }}
                          className={`group text-left transition-all duration-300 ${
                            isCompleted || isActive
                              ? 'cursor-pointer'
                              : 'cursor-default'
                          }`}
                        >

                          <div className="flex items-center gap-2">

                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                                isCompleted
                                  ? 'border-violet-400 bg-violet-500 text-white'
                                  : isActive
                                  ? 'border-violet-400/60 bg-violet-500/15 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                                  : 'border-white/[0.10] bg-white/[0.025] text-slate-600'
                              }`}
                            >

                              {isCompleted ? (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              ) : (
                                step.number
                              )}

                            </div>

                            <div className="hidden min-[420px]:block">

                              <p
                                className={`text-[10px] font-semibold transition-colors ${
                                  isActive || isCompleted
                                    ? 'text-slate-200'
                                    : 'text-slate-600'
                                }`}
                              >
                                {step.title}
                              </p>

                              <p className="mt-0.5 text-[9px] text-slate-700">
                                {step.description}
                              </p>

                            </div>

                          </div>

                        </button>
                      );
                    })}

                  </div>

                </div>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}
              <form
                onSubmit={handleFormSubmit}
                className="px-7 py-8 sm:px-9"
              >

                {/* =================================================
                    STEP 1 — PERSONAL DETAILS
                ================================================= */}
                {currentStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">

                    <div className="mb-7 flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/[0.10] bg-violet-500/[0.08]">
                        <Users className="h-4 w-4 text-violet-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Personal Details
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Tell us a little about yourself
                        </p>
                      </div>

                    </div>

                    {/* First + Last Name */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                      <div>

                        <label
                          htmlFor="first_name"
                          className={INPUT_LABEL}
                        >
                          First Name
                        </label>

                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          className={INPUT_FIELD}
                          required
                        />

                      </div>

                      <div>

                        <label
                          htmlFor="last_name"
                          className={INPUT_LABEL}
                        >
                          Last Name
                        </label>

                        <input
                          id="last_name"
                          name="last_name"
                          type="text"
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          className={INPUT_FIELD}
                          required
                        />

                      </div>

                    </div>

                    {/* Email */}
                    <div className="mt-5">

                      <label
                        htmlFor="email"
                        className={INPUT_LABEL}
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={INPUT_FIELD}
                        required
                      />

                    </div>

                    {/* Phone */}
                    <div className="mt-5">

                      <label
                        htmlFor="phone"
                        className={INPUT_LABEL}
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className={INPUT_FIELD}
                        required
                      />

                    </div>

                    {/* Continue */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:shadow-2xl hover:shadow-purple-900/40"
                    >
                      Continue

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                  </div>
                )}

                {/* =================================================
                    STEP 2 — LOCATION
                ================================================= */}
                {currentStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">

                    <div className="mb-7 flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/[0.10] bg-purple-500/[0.08]">
                        <CircleDot className="h-4 w-4 text-purple-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Location
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Where are you based?
                        </p>
                      </div>

                    </div>

                    {/* Country */}
                    <div>

                      <label
                        htmlFor="country"
                        className={INPUT_LABEL}
                      >
                        Country
                      </label>

                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="e.g. Malaysia"
                        className={INPUT_FIELD}
                        required
                      />

                    </div>

                    {/* State */}
                    <div className="mt-5">

                      <label
                        htmlFor="state"
                        className={INPUT_LABEL}
                      >
                        State
                      </label>

                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Selangor"
                        className={INPUT_FIELD}
                        required
                      />

                    </div>

                    {/* Postcode */}
                    <div className="mt-5">

                      <label
                        htmlFor="postcode"
                        className={INPUT_LABEL}
                      >
                        Postcode
                      </label>

                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="e.g. 40000"
                        className={INPUT_FIELD}
                        required
                      />

                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex gap-3">

                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex w-[35%] items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />

                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:shadow-2xl hover:shadow-purple-900/40"
                      >
                        Continue

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                    </div>

                  </div>
                )}

                {/* =================================================
                    STEP 3 — SECURITY
                ================================================= */}
                {currentStep === 3 && (
                  <div className="animate-in fade-in slide-in-from-right-2 duration-300">

                    <div className="mb-7 flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-400/[0.10] bg-fuchsia-500/[0.08]">
                        <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Security
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Keep your account protected
                        </p>
                      </div>

                    </div>

                    {/* Password */}
                    <div>

                      <label
                        htmlFor="password"
                        className={INPUT_LABEL}
                      >
                        Password
                      </label>

                      <div className="relative">

                        <input
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className={`${INPUT_FIELD} pr-12`}
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-violet-300"
                          aria-label={
                            showPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* Confirm Password */}
                    <div className="mt-5">

                      <label
                        htmlFor="confirmPassword"
                        className={INPUT_LABEL}
                      >
                        Confirm Password
                      </label>

                      <div className="relative">

                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? 'text'
                              : 'password'
                          }
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter your password"
                          className={`${INPUT_FIELD} pr-12`}
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-violet-300"
                          aria-label={
                            showConfirmPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* Terms */}
                    <div className="mt-7">

                      <label className="flex cursor-pointer items-start gap-3">

                        <input
                          type="checkbox"
                          name="termsAgreed"
                          checked={formData.termsAgreed}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/10 bg-[#100d19] accent-violet-500"
                          required
                        />

                        <span className="text-xs leading-5 text-slate-500">
                          I agree to the{' '}
                          <span className="text-violet-300">
                            Terms & Conditions
                          </span>{' '}
                          and{' '}
                          <span className="text-violet-300">
                            Privacy Policy
                          </span>
                          .
                        </span>

                      </label>

                    </div>

                    {/* Error */}
                    {error && (
                      <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3">

                        <p className="text-xs leading-5 text-red-300">
                          {error}
                        </p>

                      </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex gap-3">

                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex w-[35%] items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-4 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />

                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 hover:shadow-2xl hover:shadow-purple-900/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                      >

                        {loading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                            Creating account...
                          </>
                        ) : (
                          <>
                            Create Account

                            <CheckCircle2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                          </>
                        )}

                      </button>

                    </div>

                  </div>
                )}

                {/* Login */}
                <p className="mt-7 text-center text-xs text-slate-600">

                  Already have an account?{' '}

                  <Link
                    to="/login"
                    className="font-semibold text-violet-300 transition-colors hover:text-fuchsia-300"
                  >
                    Sign in
                  </Link>

                </p>

              </form>

            </div>

          </section>

        </div>

      </main>

      {/* =========================================================
          SUCCESS MODAL
      ========================================================= */}
      <SuccessModal
        isOpen={showSuccessModal}
        message="Welcome to OccuSync. Your customer account has been created successfully. You can now login to get started."
      />

    </div>
  );
}