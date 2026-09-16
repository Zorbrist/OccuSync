import { useState } from 'react';
import { X, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import SelectProfileModal from '../components/authentication/SelectProfileModal';

type ViewMode = 'login' | 'select-profile';

const Login = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, loading, error, setEmail, setPassword, handleLogin } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    const data = await handleLogin(e);
    if (!data) return;

    switch (data.user.role) {
      case 'ADMIN': return navigate('/admin');
      case 'BUSINESS_PROVIDER':
        return data.user.business_role === 'OWNER' ? navigate('/business') : navigate('/staff');
      case 'CUSTOMER': return navigate('/customer');
      default: return navigate('/');
    }
  };

  return (
    <>
      {viewMode === 'login' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#E8EDF2] px-4 font-sans">
          
          <div className="relative z-10 w-full max-w-md bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(149,157,165,0.15)] p-8 sm:p-10 border border-slate-50">
            
            <button
              onClick={() => navigate(-1)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 transition-all hover:text-black hover:shadow-md"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-8 text-center mt-2">
              <h1 className="text-2xl font-bold tracking-tight text-[#1E293B]">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Login to your OccuSync account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 text-sm text-[#1E293B] placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 pr-12 text-sm text-[#1E293B] placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-slate-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-[1rem] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500 font-medium text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[1rem] bg-black py-3.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-800 disabled:opacity-50 mt-4"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setViewMode('select-profile')}
                  className="font-semibold text-black transition-colors hover:text-slate-600"
                >
                  Register
                </button>
              </p>
            </div>

            <div className="my-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Secure Access
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              to="/"
              className="group flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Link>

          </div>
        </div>
      )}

      <SelectProfileModal
        isOpen={viewMode === 'select-profile'}
        onClose={() => setViewMode('login')}
      />
    </>
  );
};

export default Login;