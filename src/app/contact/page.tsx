'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import ReportForm from '@/components/ReportForm';
import { FaFacebook } from 'react-icons/fa6';

export default function ContactPage() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation onReportClick={() => setShowReportForm(true)} />
      
      <main className="pt-20 pb-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Contact Info */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Contact Support</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Touch</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-12">
                Have questions about a report? Need to update information? Our support team is here to help you stay safe.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center group-hover:border-blue-500/30 transition-all shadow-sm">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Us</h4>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">amitkumarteam90@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center group-hover:border-blue-600/30 transition-all shadow-sm">
                    <FaFacebook className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Facebook</h4>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">@adsenseguruteam</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center group-hover:border-slate-900/30 transition-all shadow-sm">
                    <MapPin className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Headquarters</h4>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Deelzo HQ, Delhi, India </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-10 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl animate-slide-up">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message Subject</label>
                    <input required type="text" placeholder="How can we help?" className="w-full px-6 py-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea required rows={5} placeholder="Type your message here..." className="w-full px-6 py-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-20 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">We&apos;ve received your inquiry and will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-10 text-blue-600 font-bold hover:underline">Send another message</button>
                </div>
              )}
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
