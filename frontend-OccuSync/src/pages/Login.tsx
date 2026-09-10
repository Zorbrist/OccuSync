import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const navigate = useNavigate();

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
                navigate('/business');
                break;

            case 'CUSTOMER':
                navigate('/customerDashboard');
                break;

            default:
                navigate('/');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

            {/* Login Modal */}
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8">

                {/* Close Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute right-4 top-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your OccuSync account
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl
                       font-semibold hover:bg-blue-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>

                {/* Back to Home Button */}
                <div className="mt-4 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        &larr; Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;