
import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onLogin?: () => void; // Optional now as we use Context
}

const Login: React.FC<LoginProps> = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@smartflow.com');
  const [password, setPassword] = useState('password123'); // Updated default
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light font-display text-[#0d101b] antialiased">
      {/* Left Side: Login Form */}
      <div className="flex flex-col w-full lg:w-[450px] xl:w-[550px] p-8 lg:p-16 bg-white shadow-2xl z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined text-2xl">dataset</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0d101b]">SmartFlow Enterprise</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-[#0d101b] tracking-tight mb-3">Welcome Back</h1>
            <p className="text-[#4c599a] text-lg">Sign in to your dashboard to manage your sales pipelines.</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#0d101b] mb-2">Email Address</label>
              <input
                className="w-full px-4 py-4 rounded-xl border border-[#cfd3e7] bg-white text-[#0d101b] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="name@company.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-[#0d101b]">Password</label>
                <a className="text-sm font-semibold text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-4 rounded-xl border border-[#cfd3e7] bg-white text-[#0d101b] focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4c599a]" type="button">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input className="w-5 h-5 rounded border-[#cfd3e7] text-primary focus:ring-primary transition-all" id="remember" type="checkbox" defaultChecked />
              <label className="ml-3 text-sm text-[#4c599a]" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>
            <button
              className="w-full bg-gradient-to-r from-primary to-[#0a1f8f] text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group"
              type="submit"
            >
              Sign In to Dashboard
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#cfd3e7]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#4c599a]">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#cfd3e7] rounded-xl hover:bg-gray-50 transition-colors">
              <img alt="Google" className="w-5 h-5" src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" />
              <span className="text-sm font-semibold text-[#0d101b]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#cfd3e7] rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-blue-600">grid_view</span>
              <span className="text-sm font-semibold text-[#0d101b]">Office 365</span>
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-between text-xs text-[#4c599a] font-medium">
          <div className="flex gap-4">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms</a>
          </div>
          <span>© 2024 SmartFlow CRM Inc.</span>
        </div>
      </div>

      {/* Right Side: Visual Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-[#0a1f8f] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:24px_24px]"></div>
        <div className="relative z-20 w-full max-w-2xl px-12">
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 transform rotate-[-2deg] shadow-2xl relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Revenue Growth</p>
                    <p className="text-white text-2xl font-bold">+24.8%</p>
                  </div>
                </div>
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-blue-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-purple-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-pink-400"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-3/4"></div>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/40 w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-10 -right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl transform rotate-[4deg] z-20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div>
                <p className="text-white font-bold">Enterprise Grade</p>
                <p className="text-white/60 text-xs">99.9% Uptime SLA</p>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Grow Faster Together</h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
              Empowering over 10,000+ enterprises with real-time data insights and intelligent sales automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
