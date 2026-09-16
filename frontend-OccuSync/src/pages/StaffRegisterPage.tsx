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
      const response = await registerStaff({ token, first_name, last_name, phone, password });
      setMessage(response.message);
      setSuccess(true);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#E8EDF2] flex items-center justify-center p-6 font-sans">

      <div className="relative z-10 w-full max-w-md bg-[#F1F5F9] rounded-[2.5rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_20px_40px_rgba(149,157,165,0.15)] p-8 sm:p-10 border border-slate-50">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
            <UserPlus size={20} className="text-[#1E293B]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1E293B]">
              Staff Registration
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
              Complete details to join
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 text-sm text-[#1E293B] outline-none transition-all focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 text-sm text-[#1E293B] outline-none transition-all focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 text-sm text-[#1E293B] outline-none transition-all focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-[1rem] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 py-3.5 text-sm text-[#1E293B] outline-none transition-all focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full mt-4 rounded-[1rem] bg-black px-4 py-3.5 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Registering...' : success ? 'Registered' : 'Register Account'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 rounded-[1rem] px-4 py-3 text-sm font-medium text-center border ${success ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
            <p>{message}</p>
            {success && <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider opacity-70">Redirecting to login...</p>}
          </div>
        )}

      </div>
    </div>
  );
}