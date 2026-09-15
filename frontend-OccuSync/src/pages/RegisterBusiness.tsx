import { useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  UserRound,
  CheckCircle2,
  Sparkles,
  CircleDot,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useRegisterBusiForm } from "../hooks/useRegisterBusi";
import SuccessModal from "../components/SuccessModal";

const INPUT_LABEL =
  "block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em] mb-2 ml-1";

const INPUT_FIELD =
  "w-full py-3.5 px-4 rounded-xl bg-[#100d19]/80 border border-white/[0.09] text-white placeholder-slate-600 focus:bg-[#15101f] focus:outline-none focus:ring-2 focus:ring-violet-500/10 focus:border-violet-400/50 transition-all duration-300";

const RegisterBusiness = () => {
  const {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  } = useRegisterBusiForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 3;
  const stepProgress = (currentStep / totalSteps) * 100;

  const steps = [
    {
      number: 1,
      title: "Company Details",
      description: "Business information",
    },
    {
      number: 2,
      title: "Owner Details",
      description: "Primary contact",
    },
    {
      number: 3,
      title: "Security",
      description: "Account protection",
    },
  ];

  const validateStep = (step: number) => {
    if (step === 1) {
      return (
        formData.businessName.trim() !== "" &&
        formData.businessRegNo.trim() !== "" &&
        formData.industry.trim() !== "" &&
        formData.state.trim() !== "" &&
        formData.postcode.trim() !== "" &&
        formData.country.trim() !== "" &&
        formData.businessPhone.trim() !== "" &&
        formData.businessEmail.trim() !== ""
      );
    }

    if (step === 2) {
      return (
        formData.ownerName.trim() !== "" &&
        formData.ownerEmail.trim() !== "" &&
        formData.ownerPhone.trim() !== ""
      );
    }

    if (step === 3) {
      return (
        formData.password !== "" &&
        formData.confirmPassword !== "" &&
        formData.password === formData.confirmPassword &&
        formData.termsAgreed
      );
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    const isSuccess = await handleSubmit(e);

    if (isSuccess) {
      setShowSuccessModal(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05030a] text-white">
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-[200px] -top-[300px] h-[800px] w-[800px] rounded-full bg-violet-700/[0.14] blur-[180px]" />

        <div className="absolute -bottom-[300px] -left-[250px] h-[750px] w-[750px] rounded-full bg-fuchsia-900/[0.12] blur-[180px]" />

        <div className="absolute left-[35%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-800/[0.07] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "65px 65px",
          }}
        />

        <div className="absolute left-[20%] top-[10%] h-[700px] w-[700px] rounded-full border border-violet-400/[0.025]" />

        <div className="absolute left-[22%] top-[13%] h-[540px] w-[540px] rounded-full border border-purple-400/[0.025]" />

        <div className="absolute left-[8%] top-[25%] h-1 w-1 rounded-full bg-violet-300/60 shadow-[0_0_14px_rgba(139,92,246,0.8)]" />

        <div className="absolute left-[43%] top-[15%] h-1.5 w-1.5 rounded-full bg-fuchsia-300/50 shadow-[0_0_18px_rgba(232,121,249,0.8)]" />

        <div className="absolute right-[8%] top-[35%] h-1 w-1 rounded-full bg-violet-300/50 shadow-[0_0_15px_rgba(139,92,246,0.7)]" />

        <div className="absolute bottom-[18%] right-[18%] h-1.5 w-1.5 rounded-full bg-purple-300/40" />
      </div>

      {/* ===================================================== */}
      {/* BACK TO HOME */}
      {/* ===================================================== */}

      <Link
        to="/"
        className="fixed left-5 top-5 z-50 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0b0913]/70 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.05] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] items-center px-5 py-24 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <section className="relative hidden lg:block">
            <div className="max-w-xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-white/[0.025] px-4 py-2 backdrop-blur-xl">
                <CircleDot className="h-3.5 w-3.5 text-violet-300" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                  OCCUSYNC BUSINESS PLATFORM
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                Grow your
                <br />

                <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  business.
                </span>
              </h1>

              <h2 className="mt-7 max-w-lg text-2xl font-semibold leading-tight text-slate-200">
                Manage services.
                <br />
                Connect customers.
                <br />
                Grow together.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500">
                Bring your customers, team and service operations together
                through one streamlined platform built for modern service
                businesses.
              </p>

              <div className="mt-10 space-y-5">

                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/[0.10] bg-violet-500/[0.08]">
                    <Building2 className="h-4 w-4 text-violet-300" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Centralized business management
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Manage your business information and service operations
                      from one platform.
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
                      Streamlined workflows
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Organize quotations, orders, customers and service
                      activities with ease.
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
                      Built for trusted providers
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Build your business presence and connect with customers
                      through OccuSync.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Network Visual */}
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-[330px] w-[620px] opacity-70">
              <svg
                viewBox="0 0 620 330"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient
                    id="businessLineGradient"
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
                    id="businessGlow"
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
                  stroke="url(#businessLineGradient)"
                  strokeWidth="1"
                />

                <path
                  d="M10 310C115 280 145 190 245 215C340 240 380 135 465 165C525 185 555 145 610 125"
                  stroke="url(#businessLineGradient)"
                  strokeWidth="1"
                />

                <path
                  d="M80 185C155 165 165 65 285 105C390 140 425 25 555 65"
                  stroke="url(#businessLineGradient)"
                  strokeWidth="1"
                />

                <circle
                  cx="220"
                  cy="140"
                  r="3"
                  fill="#A78BFA"
                  filter="url(#businessGlow)"
                />

                <circle
                  cx="430"
                  cy="85"
                  r="3"
                  fill="#C084FC"
                  filter="url(#businessGlow)"
                />

                <circle
                  cx="245"
                  cy="215"
                  r="2.5"
                  fill="#8B5CF6"
                  filter="url(#businessGlow)"
                />

                <circle
                  cx="465"
                  cy="165"
                  r="3"
                  fill="#E879F9"
                  filter="url(#businessGlow)"
                />

                <circle
                  cx="285"
                  cy="105"
                  r="2.5"
                  fill="#A78BFA"
                  filter="url(#businessGlow)"
                />
              </svg>
            </div>

            {/* Floating Status */}
            <div className="absolute bottom-0 right-4 w-56 rounded-2xl border border-white/[0.08] bg-[#0c0a14]/75 p-4 shadow-2xl shadow-purple-950/30 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    Business
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Ready to connect
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

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <section className="w-full">
            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#090711]/90 shadow-2xl shadow-purple-950/30 backdrop-blur-2xl">

              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

              {/* Header */}
              <div className="border-b border-white/[0.07] px-7 py-8 sm:px-9">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                      Business Registration
                    </p>

                    <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                      Join OccuSync
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      Bring your customers, team and service operations
                      together in one place.
                    </p>
                  </div>

                  <div className="hidden shrink-0 pt-1 sm:block">
                    <Sparkles className="h-5 w-5 text-violet-300" />
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300">
                      Step {currentStep} of {totalSteps}
                    </span>

                    <span className="text-[10px] font-medium text-slate-500">
                      {Math.round(stepProgress)}% complete
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(139,92,246,0.35)] transition-all duration-500"
                      style={{ width: `${stepProgress}%` }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {steps.map((step) => {
                      const isActive = currentStep === step.number;
                      const isCompleted = currentStep > step.number;

                      return (
                        <button
                          key={step.number}
                          type="button"
                          onClick={() => {
                            if (isCompleted || isActive) {
                              setCurrentStep(step.number);
                            }
                          }}
                          disabled={!isCompleted && !isActive}
                          className={`text-left transition-all duration-300 ${
                            isCompleted || isActive
                              ? "cursor-pointer"
                              : "cursor-default"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                                isCompleted
                                  ? "border-violet-400 bg-violet-500 text-white"
                                  : isActive
                                  ? "border-violet-400/60 bg-violet-500/15 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                                  : "border-white/[0.10] bg-white/[0.025] text-slate-600"
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
                                className={`text-[10px] font-semibold ${
                                  isActive || isCompleted
                                    ? "text-slate-200"
                                    : "text-slate-600"
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

              {/* ================================================= */}
              {/* FORM */}
              {/* ================================================= */}

              <form
                onSubmit={handleFormSubmit}
                className="px-7 py-8 sm:px-9"
              >

                {/* ================================================= */}
                {/* STEP 1 */}
                {/* ================================================= */}

                {currentStep === 1 && (
                  <div>
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/[0.10] bg-violet-500/[0.08]">
                        <Building2 className="h-4 w-4 text-violet-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Company Details
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Tell us about your business
                        </p>
                      </div>
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="businessName"
                        className={INPUT_LABEL}
                      >
                        Business Name
                      </label>

                      <input
                        required
                        id="businessName"
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Apex Plumbing Services"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Registration + Industry */}
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                      {/* Registration Number */}
                      <div>
                        <label
                          htmlFor="businessRegNo"
                          className={INPUT_LABEL}
                        >
                          Business Registration No.
                        </label>

                        <input
                          required
                          id="businessRegNo"
                          type="text"
                          name="businessRegNo"
                          value={formData.businessRegNo}
                          onChange={handleChange}
                          placeholder="e.g. 12345678-X"
                          className={INPUT_FIELD}
                        />
                      </div>

                      {/* INDUSTRY */}
                      <div>
                        <label
                          htmlFor="industry"
                          className={INPUT_LABEL}
                        >
                          Industry
                        </label>

                        <div className="relative group">

                          <select
                            required
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className={`
                              w-full
                              appearance-none
                              cursor-pointer
                              border-0
                              border-b
                              bg-transparent
                              px-1
                              py-3.5
                              pr-9
                              text-sm
                              outline-none
                              transition-all
                              duration-300
                              focus:ring-0

                              ${
                                formData.industry
                                  ? "border-violet-400/50 text-violet-100 drop-shadow-[0_0_8px_rgba(167,139,250,0.35)]"
                                  : "border-white/[0.12] text-slate-600"
                              }

                              hover:border-violet-400/40
                              focus:border-violet-400/70
                            `}
                          >
                            <option
                              value=""
                              disabled
                              className="bg-[#0b0913] text-slate-500"
                            >
                              Select your industry
                            </option>

                            <option
                              value="HVAC"
                              className="bg-[#0b0913] text-white"
                            >
                              HVAC
                            </option>

                            <option
                              value="Construction"
                              className="bg-[#0b0913] text-white"
                            >
                              Construction
                            </option>

                            <option
                              value="Energy"
                              className="bg-[#0b0913] text-white"
                            >
                              Energy
                            </option>

                            <option
                              value="Logistics"
                              className="bg-[#0b0913] text-white"
                            >
                              Logistics
                            </option>

                            <option
                              value="Plumbing"
                              className="bg-[#0b0913] text-white"
                            >
                              Plumbing
                            </option>
                          </select>

                          {/* Chevron */}
                          <ChevronDown
                            className={`
                              pointer-events-none
                              absolute
                              right-1
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              transition-all
                              duration-300

                              ${
                                formData.industry
                                  ? "text-violet-300 drop-shadow-[0_0_6px_rgba(167,139,250,0.7)]"
                                  : "text-slate-600"
                              }

                              group-hover:text-violet-300
                            `}
                          />

                          {/* Glow Line */}
                          <div
                            className={`
                              pointer-events-none
                              absolute
                              bottom-0
                              left-0
                              h-px
                              transition-all
                              duration-500

                              ${
                                formData.industry
                                  ? "w-full bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-500 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                                  : "w-0 bg-violet-500"
                              }

                              group-focus-within:w-full
                            `}
                          />

                          {/* Subtle Glow */}
                          {formData.industry && (
                            <div className="pointer-events-none absolute -bottom-3 left-[10%] right-[10%] h-4 rounded-full bg-violet-500/10 blur-xl" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Area */}
                    <div className="mt-5">
                      <label
                        htmlFor="areaOfService"
                        className={INPUT_LABEL}
                      >
                        Area of Service
                      </label>

                      <input
                        id="areaOfService"
                        type="text"
                        name="areaOfService"
                        value={formData.areaOfService}
                        onChange={handleChange}
                        placeholder="e.g. Klang Valley"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Location */}
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

                      <div>
                        <label
                          htmlFor="state"
                          className={INPUT_LABEL}
                        >
                          State
                        </label>

                        <input
                          required
                          id="state"
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Selangor"
                          className={INPUT_FIELD}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="postcode"
                          className={INPUT_LABEL}
                        >
                          Postcode
                        </label>

                        <input
                          required
                          id="postcode"
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="41200"
                          className={INPUT_FIELD}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className={INPUT_LABEL}
                        >
                          Country
                        </label>

                        <input
                          required
                          id="country"
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="Malaysia"
                          className={INPUT_FIELD}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mt-5">
                      <label
                        htmlFor="businessPhone"
                        className={INPUT_LABEL}
                      >
                        Business Phone
                      </label>

                      <input
                        required
                        id="businessPhone"
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleChange}
                        placeholder="+60 12-345 6789"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Email */}
                    <div className="mt-5">
                      <label
                        htmlFor="businessEmail"
                        className={INPUT_LABEL}
                      >
                        Business Email
                      </label>

                      <input
                        required
                        id="businessEmail"
                        type="email"
                        name="businessEmail"
                        value={formData.businessEmail}
                        onChange={handleChange}
                        placeholder="contact@company.com"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Continue */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500"
                    >
                      Continue

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}

                {/* ================================================= */}
                {/* STEP 2 */}
                {/* ================================================= */}

                {currentStep === 2 && (
                  <div>
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/[0.10] bg-purple-500/[0.08]">
                        <UserRound className="h-4 w-4 text-purple-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Owner Details
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Tell us about the primary contact
                        </p>
                      </div>
                    </div>

                    {/* Owner Name */}
                    <div>
                      <label
                        htmlFor="ownerName"
                        className={INPUT_LABEL}
                      >
                        Full Name
                      </label>

                      <input
                        required
                        id="ownerName"
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Owner Email */}
                    <div className="mt-5">
                      <label
                        htmlFor="ownerEmail"
                        className={INPUT_LABEL}
                      >
                        Email Address
                      </label>

                      <input
                        required
                        id="ownerEmail"
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Owner Phone */}
                    <div className="mt-5">
                      <label
                        htmlFor="ownerPhone"
                        className={INPUT_LABEL}
                      >
                        Phone Number
                      </label>

                      <input
                        required
                        id="ownerPhone"
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        placeholder="+60 12-345 6789"
                        className={INPUT_FIELD}
                      />
                    </div>

                    {/* Information */}
                    <div className="mt-6 rounded-xl border border-violet-400/[0.08] bg-violet-500/[0.04] px-4 py-3.5">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                        <p className="text-xs leading-5 text-slate-500">
                          This information will be used as the primary contact
                          for your business account and verification process.
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex w-[35%] items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-4 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500"
                      >
                        Continue

                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* STEP 3 */}
                {/* ================================================= */}

                {currentStep === 3 && (
                  <div>
                    <div className="mb-7 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-400/[0.10] bg-fuchsia-500/[0.08]">
                        <ShieldCheck className="h-4 w-4 text-fuchsia-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Security
                        </h3>

                        <p className="text-[11px] text-slate-600">
                          Protect your business account
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
                          required
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className={`${INPUT_FIELD} pr-12`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-violet-300"
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
                          required
                          id="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter your password"
                          className={`${INPUT_FIELD} pr-12`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              (prev) => !prev
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-violet-300"
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
                          required
                          type="checkbox"
                          name="termsAgreed"
                          checked={formData.termsAgreed}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/10 bg-[#100d19] accent-violet-500"
                        />

                        <span className="text-xs leading-5 text-slate-500">
                          I agree to the{" "}
                          <a
                            href="#"
                            className="font-medium text-violet-300 hover:text-fuchsia-300 hover:underline"
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="font-medium text-violet-300 hover:text-fuchsia-300 hover:underline"
                          >
                            Privacy Policy
                          </a>
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

                    {/* Buttons */}
                    <div className="mt-8 flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex w-[35%] items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-4 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-purple-950/30 transition-all hover:-translate-y-0.5 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit for Verification
                            <CheckCircle2 className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Login */}
                <p className="mt-7 text-center text-xs text-slate-600">
                  Already have an account?{" "}
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

      {/* ===================================================== */}
      {/* SUCCESS MODAL */}
      {/* ===================================================== */}

      <SuccessModal
        isOpen={showSuccessModal}
        title="Business Registered!"
        message="Welcome to OccuSync. Your business account has been submitted successfully. You can now login to access your workspace."
      />
    </div>
  );
};

export default RegisterBusiness;