'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ReportForm from '@/components/ReportForm';
import { FileText, ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation onReportClick={() => setShowReportForm(true)} />
      
      <main className="pt-20 pb-24">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6">
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Legal Document</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Last updated: May 7, 2026</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-12 animate-slide-up">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 md:p-12 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                By accessing and using Scammer Alert, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. Our platform is provided &quot;as is&quot; for community protection purposes.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">2. User Responsibilities</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                When reporting a scammer, you represent and warrant that the information provided is accurate and based on real-world interactions. False reporting or malicious use of the platform to harass individuals is strictly prohibited and may result in a permanent ban.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-400 font-medium">
                <li>Provide honest and detailed descriptions of scam attempts.</li>
                <li>Do not share sensitive personal information (OTPs, private keys) in public reports.</li>
                <li>Respect the privacy of non-scamming individuals.</li>
              </ul>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">3. Data Accuracy</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                While we strive to verify all reports, Scammer Alert does not guarantee the 100% accuracy of all community-submitted data. Users should exercise their own judgment and use our platform as one of many tools for digital safety.
              </p>
            </div>

            <div className="space-y-6 px-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">4. Limitation of Liability</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Scammer Alert and its operators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform.
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
