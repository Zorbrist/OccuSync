import { useState } from 'react';
import {
  X,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import SelectProfileModal from '../components/authentication/SelectProfileModal';

type ViewMode = 'login' | 'select-profile';

const Login = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    const data = await handleLogin(e);

    if (!data) return;

    switch (data.user.role) {
      case 'ADMIN':
        navigate('/admin');
        break;

      case 'SERVICE_PROVIDER':
        if (data.user.business_role === 'OWNER') {
          navigate('/business');
        } else if (data.user.business_role === 'STAFF') {
          navigate('/staff');
        }
        break;

      case 'CUSTOMER':
        navigate('/customer');
        break;

      default:
        navigate('/');
    }
  };

  return (
    <>
      {/* =========================================================
          LOGIN VIEW
      ========================================================= */}
      {viewMode === 'login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#05030a] px-4">

          {/* =====================================================
              BACKGROUND
          ===================================================== */}

          {/* Purple glow - top right */}
          <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px]" />

          {/* Maroon glow - bottom left */}
          <div className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-fuchsia-900/15 blur-[160px]" />

          {/* Center glow */}
          <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[140px]" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
            }}
          />

          {/* Decorative rings */}
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/[0.04]" />
          <div className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/[0.025]" />

          {/* Floating dots */}
          <div className="absolute left-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-violet-400/60 shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
          <div className="absolute right-[16%] top-[20%] h-1 w-1 rounded-full bg-fuchsia-400/60 shadow-[0_0_12px_rgba(232,121,249,0.8)]" />
          <div className="absolute bottom-[22%] left-[20%] h-1 w-1 rounded-full bg-purple-300/50" />
          <div className="absolute bottom-[18%] right-[14%] h-1.5 w-1.5 rounded-full bg-violet-400/50 shadow-[0_0_15px_rgba(139,92,246,0.6)]" />

          {/* =====================================================
              LOGIN CARD
          ===================================================== */}

          <div className="relative z-10 w-full max-w-md">

            {/* Soft card glow */}
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-violet-600/20 via-purple-600/10 to-fuchsia-600/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[26px] border border-white/[0.10] bg-[#0b0913]/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-10">

              {/* Top decorative gradient */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

              {/* Small corner glow */}
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />

              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}

              <button
                onClick={() => navigate(-1)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-500 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

{/* =================================================
    HEADER
================================================= */}

<div className="mb-8 text-center">
  <h1 className="text-3xl font-black tracking-tight text-white">
    Welcome Back
  </h1>

  <p className="mt-2 text-sm text-slate-400">
    Login to your OccuSync account
  </p>
</div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3.5 pr-12 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.05] hover:text-violet-300"
                      aria-label={
                        showPassword
                          ? 'Hide password'
                          : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>

                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {/* Shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {loading ? 'Logging in...' : 'Login'}
                  </span>
                </button>

              </form>

              {/* =================================================
                  REGISTER
              ================================================= */}

              <div className="mt-7 text-center">

                <p className="text-sm text-slate-500">
                  Don't have an account?{' '}

                  <button
                    type="button"
                    onClick={() =>
                      setViewMode('select-profile')
                    }
                    className="font-semibold text-violet-300 transition-colors hover:text-fuchsia-300"
                  >
                    Register
                  </button>
                </p>

              </div>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] uppercase tracking-widest text-slate-600">
                  Secure Access
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {/* =================================================
                  BACK TO HOME
              ================================================= */}

              <Link
                to="/"
                className="group flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Home
              </Link>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          PROFILE SELECTION
      ========================================================= */}

      <SelectProfileModal
        isOpen={viewMode === 'select-profile'}
        onClose={() => setViewMode('login')}
      />
    </>
  );
};

export default Login;