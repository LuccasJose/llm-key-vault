import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { DEMO_PASSWORD } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-500/10 rounded-full">
            <Lock size={40} className="text-indigo-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">Vault Access</h1>
        <p className="text-slate-400 text-center mb-8 text-sm">Enter the master password to access the keys.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full bg-slate-950 border ${error ? 'border-red-500 animate-shake' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors`}
              placeholder="Master Password"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
          >
            Unlock Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        {error && (
            <p className="text-red-500 text-center text-sm mt-4">Access Denied: Invalid credentials.</p>
        )}
      </div>
    </div>
  );
};