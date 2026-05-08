'use client';

import { useState, KeyboardEvent } from 'react';
import { Search, ShieldAlert, Users, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onReportClick: () => void;
  searchQuery: string;
}

export default function Hero({ onSearch, searchQuery }: HeroProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearchSubmit = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-20 sm:pt-24 sm:pb-32">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] left-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in">
            <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Crowdsourced Protection</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
            Stop Scammers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">In Their Tracks</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Search our community-verified database of scammer phone numbers, social media handles, and profiles. Together, we can build a safer digital world.
          </p>

          {/* Search Bar Container */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-2 shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
              <div className="flex items-center">
                <div className="pl-3 sm:pl-6 pr-3">
                  <Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Enter phone number, FB handle, or ID..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 py-2 md:py-4 bg-transparent border-0 focus:outline-none text-base md:text-lg text-slate-900 dark:text-white placeholder:text-slate-400 w-full"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="flex items-center gap-2 px-4 py-2 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 mr-1"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:flex">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">10K+</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Reports</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-slate-900 dark:text-white">50K+</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Protected</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
