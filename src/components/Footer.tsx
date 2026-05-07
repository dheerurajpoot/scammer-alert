'use client';

import Link from 'next/link';
import { Shield, Mail } from 'lucide-react';
import { BsTwitter } from 'react-icons/bs';
import { GiThumbDown } from 'react-icons/gi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Scammer Alert</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Building a safer digital world together through community-verified scam reporting and protection tools.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                <BsTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <GiThumbDown className="w-4 h-4" />
              </a>
              <a href="mailto:contact@scammeralert.com" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">Search Database</Link></li>
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">How it Works</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/terms" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6">Stay Safe</h3>
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-100">Pro Tip</p>
              <p className="text-sm font-medium leading-relaxed">
                Never share your OTP or private keys with anyone. Verified services will never ask for them.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {currentYear} Scammer Alert. All community reports are verified.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Status: Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
