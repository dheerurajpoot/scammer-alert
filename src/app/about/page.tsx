'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Shield, Users, CheckCircle, Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import ReportForm from '@/components/ReportForm';

export default function AboutPage() {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation onReportClick={() => setShowReportForm(true)} />
      
      <main className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
            Protecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Digital Front</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Scammer Alert is a community-driven platform dedicated to exposing fraudulent activities and protecting innocent users from digital scams.
          </p>
        </section>

        {/* Values Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Community Verified</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Every report on our platform comes from real users who have encountered scammers. We believe in the power of collective vigilance.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition-all group">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Strict Verification</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Our admin team manually reviews every submission to ensure accuracy and prevent false reports, maintaining the integrity of our database.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all group">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Always Anonymous</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                We prioritize your safety. Reports can be submitted anonymously, ensuring you can help others without compromising your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 dark:bg-slate-900/50 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">How it Works</h2>
            
            <div className="space-y-12">
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center font-black text-xl">1</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Identify a Scammer</h4>
                  <p className="text-slate-400 leading-relaxed">Collect evidence including phone numbers, social media handles, or website URLs used by the fraudster.</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-black text-xl">2</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Submit a Secure Report</h4>
                  <p className="text-slate-400 leading-relaxed">Use our encrypted form to share the details. Include a description of the scam to help others recognize the pattern.</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-12 h-12 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center font-black text-xl">3</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Admin Verification</h4>
                  <p className="text-slate-400 leading-relaxed">Our moderators review the report for consistency and evidence. Once verified, it becomes part of our public database.</p>
                </div>
              </div>
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
