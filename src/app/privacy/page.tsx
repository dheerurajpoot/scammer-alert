'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ReportForm from '@/components/ReportForm';
import { EyeOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation onReportClick={() => setShowReportForm(true)} />
      
      <main className="pt-20 pb-24">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
              <EyeOff className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Privacy First</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Your security is our priority</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-12 animate-slide-up">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 md:p-12 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-600" />
                Data Protection Commitment
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                At Scammer Alert, we take your privacy seriously. We collect only the information necessary to provide a safe reporting environment and never sell your personal data to third parties.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">1. Information We Collect</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                When you submit a report, we collect the details you provide about the scammer (phone numbers, IDs, etc.). You have the option to remain completely anonymous, or provide an email for follow-up verification.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">2. How We Use Data</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                The data collected is used solely to populate our searchable database and alert other users about potential fraud. Verified reports are made public to maximize community protection.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">3. Cookies and Tracking</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We use minimal functional cookies to maintain your session and preferences. We do not use intrusive tracking or third-party advertising cookies.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">4. Your Rights</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                You have the right to request the removal of any information you have submitted. Contact our support team for any privacy-related inquiries.
              </p>
            </div>
          </div>
        </section>
      </main>

      {showReportForm && (
        <ReportForm 
          onClose={() => setShowReportForm(false)} 
          onSubmitted={() => setShowReportForm(false)} 
        />
      )}
      
      <Footer />
    </div>
  );
}
