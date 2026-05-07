'use client';

import { ScammerReport, ScamType } from '@/lib/types';
import { ShieldAlert, Calendar, ExternalLink, Hash, UserCircle } from 'lucide-react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa6';
  
interface SearchResultsProps {
  results: ScammerReport[];
  isLoading: boolean;
  query: string;
}

const scamTypeColors: Record<ScamType, { bg: string; text: string; dot: string }> = {
  'phishing': { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' },
  'romance': { bg: 'bg-pink-50 dark:bg-pink-950/30', text: 'text-pink-700 dark:text-pink-300', dot: 'bg-pink-500' },
  'investment': { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  'loan': { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
  'impersonation': { bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
  'tech-support': { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  'prize': { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  'buy-sell': { bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-500' },
  'digital-service': { bg: 'bg-indigo-50 dark:bg-indigo-950/30', text: 'text-indigo-700 dark:text-indigo-300', dot: 'bg-indigo-500' },
  'other': { bg: 'bg-slate-50 dark:bg-slate-800/50', text: 'text-slate-700 dark:text-slate-300', dot: 'bg-slate-500' },
};

const scamTypeLabels: Record<ScamType, string> = {
  'phishing': 'Phishing Scam',
  'romance': 'Romance Scam',
  'investment': 'Investment Fraud',
  'loan': 'Loan Scam',
  'impersonation': 'Impersonation',
  'tech-support': 'Tech Support',
  'prize': 'Prize/Lottery',
  'buy-sell': 'Buy/Sell Scam',
  'digital-service': 'Digital Service Fraud',
  'other': 'Blogging / Other Scam',
};

export default function SearchResults({ results, isLoading, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Scanning database...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {results.length > 0 ? 'Search Results' : 'No Results Found'}
          </h2>
          <p className="text-slate-500 font-medium">
            {results.length > 0 
              ? `Found ${results.length} reported ${results.length === 1 ? 'scammer' : 'scammers'} matching "${query}"`
              : `No scammers found matching "${query}". If you know of a scammer with this ID, please report them.`
            }
          </p>
        </div>
        {results.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" />
            Verified Community Reports
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {results.map((report) => (
          <div key={report.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all p-8 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${scamTypeColors[report.scamType].bg}`}>
                <div className={`w-2 h-2 rounded-full ${scamTypeColors[report.scamType].dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${scamTypeColors[report.scamType].text}`}>
                  {scamTypeLabels[report.scamType]}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Calendar className="w-4 h-4" />
                {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="space-y-3 mb-8">
                {report.phoneNumber && (
                  <div className="flex items-center gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-blue-500 transition-colors">
                      <Hash className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-lg font-bold text-slate-800 dark:text-slate-200">{report.phoneNumber}</span>
                  </div>
                )}
                {report.facebookId && (
                  <div className="flex items-center gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-blue-600 transition-colors">
                      <FaFacebook className="w-4 h-4" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{report.facebookId}</span>
                  </div>
                )}
                {report.instagramId && (
                  <div className="flex items-center gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-purple-500 transition-colors">
                      <BsInstagram className="w-4 h-4" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">@{report.instagramId.replace('@', '')}</span>
                  </div>
                )}
                {report.otherId && (
                  <div className="flex items-center gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/item:text-slate-600 transition-colors">
                      <UserCircle className="w-4 h-4" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{report.otherId}</span>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20 rounded-full" />
                <div className="pl-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Detailed Report</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-lg">
                    &ldquo;{report.description}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live Security Status: Verified</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group/btn transition-colors">
                View Proof
                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
