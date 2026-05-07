'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseServices } from '@/hooks/useFirebase';
import { ref, set } from 'firebase/database';
import { Lock, AlertCircle, ShieldCheck, Mail, KeyRound, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { auth, database } = getFirebaseServices();
      
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const adminRef = ref(database, `admins/${userCredential.user.uid}`);
        await set(adminRef, {
          email: userCredential.user.email,
          createdAt: Date.now(),
          role: 'admin',
        });
        
        setEmail('');
        setPassword('');
        setIsSignup(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('Admin account not found. Please contact the system administrator.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/email-already-in-use' && isSignup) {
        setError('This email is already registered.');
      } else if (err.code === 'auth/weak-password' && isSignup) {
        setError('Password must be at least 6 characters long.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full -ml-48 -mb-48 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-lg relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Restricted Access</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Admin Portal</h1>
          <p className="text-slate-500 font-medium">Verify security credentials to continue.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800 p-10 md:p-12 mb-8 animate-slide-up">
          {error && (
            <div className="flex gap-3 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl mb-8 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <p className="text-rose-800 dark:text-rose-200 text-sm font-bold tracking-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Identity</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scammeralert.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignup ? 'Initialize Account' : 'Authenticate Session'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* <div className="mt-8 text-center">
            <p className="text-xs font-bold text-slate-400">
              {isSignup ? (
                <>
                  Existing operator?{' '}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Authenticate here
                  </button>
                </>
              ) : (
                <>
                  New security operative?{' '}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Register identity
                  </button>
                </>
              )}
            </p>
          </div> */}
        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            By authenticating, you agree to the <strong>Operational Protocol</strong>. All actions are logged and audited for community safety.
          </p>
        </div>
      </div>
    </div>
  );
}
