'use client';

import { useState, useEffect } from 'react';
import { getFirebaseServices } from '@/hooks/useFirebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import AdminDashboard from '@/components/AdminDashboard';
import AdminLogin from '@/components/AdminLogin';
import { Lock } from 'lucide-react';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth } = getFirebaseServices();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const { auth } = getFirebaseServices();
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <AdminDashboard userEmail={user.email || ''} />
    </div>
  );
}
