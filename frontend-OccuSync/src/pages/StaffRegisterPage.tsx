import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { registerStaff } from '../services/authService';

export default function StaffRegisterPage() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  // ============================================================
  // REDIRECT TO LOGIN AFTER SUCCESSFUL REGISTRATION
  // ============================================================

  useEffect(() => {
    if (!success) return;

    const timeout = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [success, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage('Invalid invitation link');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await registerStaff({
        token,
        first_name,
        last_name,
        phone,
        password
      });

      setMessage(response.message);
      setSuccess(true);

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-50/40 flex items-center justify-center p-6">

      {/* Local keyframes: flowing background blobs + one card entrance */}
      <style>{`
        @keyframes blobDrift1 {
          0%   { transform: translate(-10%, -10%) scale(1); }
          50%  { transform: translate(8%, 6%) scale(1.15); }
          100% { transform: translate(-10%, -10%) scale(1); }
        }
        @keyframes blobDrift2 {
          0%   { transform: translate(6%, 4%) scale(1); }
          50%  { transform: translate(-8%, -8%) scale(1.1); }
          100% { transform: translate(6%, 4%) scale(1); }
        }
        @keyframes blobDrift3 {
          0%   { transform: translate(0%, 8%) scale(1); }
          50%  { transform: translate(-6%, -6%) scale(1.2); }
          100% { transform: translate(0%, 8%) scale(1); }
        }
        @keyframes cardRise {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .blob-1 { animation: blobDrift1 22s ease-in-out infinite; }
          .blob-2 { animation: blobDrift2 26s ease-in-out infinite; }
          .blob-3 { animation: blobDrift3 30s ease-in-out infinite; }
          .register-card { animation: cardRise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        }
      `}</style>

      {/* Flowing gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob-1 absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-rose-300/50 to-amber-200/40 blur-3xl" />
        <div className="blob-2 absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-rose-950/20 to-red-400/30 blur-3xl" />
        <div className="blob-3 absolute bottom-[-10rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-amber-200/40 to-rose-200/50 blur-3xl" />
      </div>

      {/* Register Card */}
      <div className="register-card relative z-10 w-full max-w-md rounded-3xl border border-rose-100 bg-white/90 backdrop-blur-xl p-8 shadow-xl shadow-rose-950/10">

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 shadow-lg">
            <UserPlus size={20} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-rose-950">
              Staff Registration
            </h1>

            <p className="text-sm text-slate-400">
              Complete your details to join the team.
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                First Name
              </label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Last Name
              </label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300"
              />
            </div>

          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-rose-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full rounded-2xl bg-rose-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Registering...' : success ? 'Registered' : 'Register'}
          </button>

        </form>

        {message && (
          <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>{message}</p>
            {success && (
              <p className="mt-1 text-slate-400">
                Redirecting to the login page
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}