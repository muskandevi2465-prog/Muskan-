import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, register, showToast } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password, phone);
        showToast("Account created successfully! Welcome to Muskan's Stitching.");
      } else {
        await login(email, password);
        showToast("Welcome back to Muskan's Stitching!");
      }
      setIsAuthOpen(false);
    } catch (err: any) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF5EE] rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#E8D9C8] relative">
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 text-[#73574E] hover:text-[#3B2118] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="font-serif-luxury text-2xl font-medium text-[#3B2118]">
            {isRegister ? 'Create Your Atelier Profile' : "Sign In to Muskan's Stitching"}
          </h3>
          <p className="text-xs text-[#73574E] mt-1.5">
            {isRegister
              ? 'Join our circle to enjoy bespoke concierge services, wishlist access, and order history.'
              : 'Enter your credentials to access your saved ensembles and tracking.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-[#5D4238] mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#5D4238] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="radhika@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#5D4238] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-[#5D4238] mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#73574E] absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8D9C8] rounded-xl text-xs text-[#3B2118] focus:outline-hidden focus:border-[#8F5567]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#3B2118] hover:bg-[#2A160F] text-[#FAF5EE] rounded-xl text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#73574E]">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="text-[#8F5567] font-semibold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to Muskan's Stitching?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="text-[#8F5567] font-semibold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
