'use client';

import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { getFirebaseServices } from '@/hooks/useFirebase';
import { ScamType, ScammerReport } from '@/lib/types';
import { X, ShieldAlert, CheckCircle2, Phone, UserCircle, MessageSquare, Mail, Send } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa6';

interface ReportFormProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const SCAM_TYPES: { value: ScamType; label: string }[] = [
  { value: 'phishing', label: 'Phishing' },
  { value: 'romance', label: 'Romance Scam' },
  { value: 'investment', label: 'Investment Fraud' },
  { value: 'loan', label: 'Loan Scam' },
  { value: 'impersonation', label: 'Impersonation' },
  { value: 'tech-support', label: 'Tech Support Scam' },
  { value: 'prize', label: 'Prize/Lottery' },
  { value: 'buy-sell', label: 'Buy/Sell Scam' },
  { value: 'digital-service', label: 'Digital Service Fraud' },
  { value: 'other', label: 'Other / Blogging Scam' },
];

export default function ReportForm({ onClose, onSubmitted }: ReportFormProps) {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    facebookId: '',
    instagramId: '',
    otherId: '',
    scamType: 'other' as ScamType,
    description: '',
    reportedByEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const hasContactInfo = 
      formData.phoneNumber.trim() || 
      formData.facebookId.trim() || 
      formData.instagramId.trim() || 
      formData.otherId.trim();

    if (!hasContactInfo) {
      setError('Please provide at least one contact identifier.');
      return;
    }

    if (formData.description.trim().length < 10) {
      setError('Please provide a more detailed description (min 10 chars).');
      return;
    }

    setIsSubmitting(true);

    try {
      const { database } = getFirebaseServices();
      const reportsRef = ref(database, 'scammerReports');
      
      const newReport: Omit<ScammerReport, 'id'> = {
        scamType: formData.scamType,
        description: formData.description.trim(),
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...(formData.phoneNumber.trim() && { phoneNumber: formData.phoneNumber.trim() }),
        ...(formData.facebookId.trim() && { facebookId: formData.facebookId.trim() }),
        ...(formData.instagramId.trim() && { instagramId: formData.instagramId.trim() }),
        ...(formData.otherId.trim() && { otherId: formData.otherId.trim() }),
        ...(formData.reportedByEmail.trim() && { reportedByEmail: formData.reportedByEmail.trim() }),
      };

      await push(reportsRef, newReport);
      setSuccess(true);
      
      setTimeout(() => {
        onSubmitted();
        onClose();
      }, 2500);
    } catch (err) {
      setError('Submission failed. Please check your connection.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-md w-full p-12 text-center shadow-2xl border border-white/20 animate-slide-up">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 dark:text-white leading-tight">Report Received!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">
            Thank you for your contribution. Our team will verify the details within 24 hours.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            Closing secure session...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-2xl w-full my-8 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-4 md:px-8 py-6 md:py-10 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-4">
            <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-[0.2em]">Secure Submission</span>
          </div>
          <h2 className="text-lg md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Report a Scammer</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Help us protect the community with accurate details.</p>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-2xl transition-all"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-8 md:space-y-8 space-y-6">
          {error && (
            <div className="flex gap-3 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl animate-shake">
              <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <p className="text-rose-800 dark:text-rose-200 text-sm font-bold tracking-tight">{error}</p>
            </div>
          )}

          {/* Contact Identifiers Grid */}
          <div className="md:space-y-6 space-y-4">
            <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Scammer Identifiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">
              <div className="relative group">
                <div className="absolute left-4  top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
                />
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaFacebook className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="text"
                  name="facebookId"
                  placeholder="Facebook Username/ID"
                  value={formData.facebookId}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/50 transition-all font-medium"
                />
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors">
                  <BsInstagram className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="text"
                  name="instagramId"
                  placeholder="Instagram Handle"
                  value={formData.instagramId}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500/50 transition-all font-medium"
                />
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
                  <UserCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <input
                  type="text"
                  name="otherId"
                  placeholder="Telegram / WhatsApp / Other"
                  value={formData.otherId}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-500/5 focus:border-slate-500/50 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Scam Type */}
            <div className="md:space-y-4 space-y-2">
              <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Type of Fraud</h3>
              <select
                name="scamType"
                value={formData.scamType}
                onChange={handleChange}
                className="w-full px-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all md:font-bold text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
              >
                {SCAM_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Submitter Email */}
            <div className="md:space-y-4 space-y-2">
              <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Your Email (Optional)</h3>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="reportedByEmail"
                  placeholder="For follow-up only"
                  value={formData.reportedByEmail}
                  onChange={handleChange}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:space-y-4 space-y-2">
            <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Scam Incident Details</h3>
            <div className="relative group">
              <div className="absolute left-4 top-3 md:top-6 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea
                name="description"
                placeholder="How did they contact you? What happened?"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full pl-12 pr-4 py-2 md:py-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row gap-4 md:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 md:py-4 px-6 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 md:py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
