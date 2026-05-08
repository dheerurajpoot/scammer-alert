'use client';

import Link from 'next/link';
import { Shield, Plus } from 'lucide-react';

interface NavigationProps {
  onReportClick: () => void;
}

export default function Navigation({ onReportClick }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl tracking-tight">Scammers.Pro</span>
            <span className="text-[8px] md:text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider -mt-1">Community Protection</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={onReportClick}
            className="flex items-center gap-2 px-2 py-1.5 md:px-5 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Report Scammer</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
