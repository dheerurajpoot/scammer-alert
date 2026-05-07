'use client';

import { useState, useEffect } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { getFirebaseServices } from '@/hooks/useFirebase';
import { ScammerReport } from '@/lib/types';
import { 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Eye, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  User, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Hash,

  FileText
} from 'lucide-react';
import { FaFacebook } from 'react-icons/fa6';
import { BsInstagram } from 'react-icons/bs';

interface AdminDashboardProps {
  userEmail: string;
}

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

const scamTypeLabels: Record<string, string> = {
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

const statusConfig = {
  pending: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  approved: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
  rejected: { bg: 'bg-rose-50 dark:bg-rose-950/30', text: 'text-rose-700 dark:text-rose-300', dot: 'bg-rose-500' },
};

export default function AdminDashboard({ userEmail }: AdminDashboardProps) {
  const [reports, setReports] = useState<ScammerReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedReport, setSelectedReport] = useState<ScammerReport | null>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const { database } = getFirebaseServices();
    const reportsRef = ref(database, 'scammerReports');
    
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const reportsList: ScammerReport[] = Object.entries(data).map(([id, report]: [string, any]) => ({
          ...report,
          id,
        }));

        reportsList.sort((a, b) => b.createdAt - a.createdAt);
        setReports(reportsList);

        const total = reportsList.length;
        const pending = reportsList.filter((r) => r.status === 'pending').length;
        const approved = reportsList.filter((r) => r.status === 'approved').length;
        const rejected = reportsList.filter((r) => r.status === 'rejected').length;

        setStats({ total, pending, approved, rejected });
      } else {
        setReports([]);
        setStats({ total: 0, pending: 0, approved: 0, rejected: 0 });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (reportId: string) => {
    try {
      const { database } = getFirebaseServices();
      const reportRef = ref(database, `scammerReports/${reportId}`);
      await update(reportRef, {
        status: 'approved',
        updatedAt: Date.now(),
      });
      setSelectedReport(null);
    } catch (err) {
      console.error('Approval error:', err);
    }
  };

  const handleReject = async (reportId: string) => {
    try {
      const { database } = getFirebaseServices();
      const reportRef = ref(database, `scammerReports/${reportId}`);
      await update(reportRef, {
        status: 'rejected',
        updatedAt: Date.now(),
        rejectionReason: 'Rejected by admin',
      });
      setSelectedReport(null);
    } catch (err) {
      console.error('Rejection error:', err);
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report permanently?')) return;

    try {
      const { database } = getFirebaseServices();
      const reportRef = ref(database, `scammerReports/${reportId}`);
      await remove(reportRef);
      setSelectedReport(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesFilter = filter === 'all' || report.status === filter;
    const matchesSearch = searchTerm === '' || 
      report.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.facebookId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.instagramId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4 animate-fade-in">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Accessing Database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Dashboard Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-slate-500 font-medium">Manage and verify community security reports.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reports</p>
          <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.total}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Review</p>
          <p className="text-4xl font-black text-amber-600">{stats.pending}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Approved</p>
          <p className="text-4xl font-black text-emerald-600">{stats.approved}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-rose-600" />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Rejected</p>
          <p className="text-4xl font-black text-rose-600">{stats.rejected}</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          {(['all', 'pending', 'approved', 'rejected'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {f === 'all' ? 'All Reports' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-20 text-center animate-fade-in">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No reports match your criteria</h3>
            <p className="text-slate-500 font-medium">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer animate-slide-up"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className={`px-4 py-1 rounded-full flex items-center gap-2 ${statusConfig[report.status].bg}`}>
                      <div className={`w-2 h-2 rounded-full ${statusConfig[report.status].dot}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${statusConfig[report.status].text}`}>
                        {report.status}
                      </span>
                    </div>
                    <span className="px-4 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                      {scamTypeLabels[report.scamType] || report.scamType}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-4">
                    {report.phoneNumber && (
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <Hash className="w-4 h-4 text-slate-400" />
                        <span className="font-mono font-bold">{report.phoneNumber}</span>
                      </div>
                    )}
                    {report.facebookId && (
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <FaFacebook className="w-4 h-4 text-blue-500" />
                        <span className="font-bold">{report.facebookId}</span>
                      </div>
                    )}
                    {report.instagramId && (
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                        <BsInstagram className="w-4 h-4 text-purple-500" />
                        <span className="font-bold">@{report.instagramId}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1 italic font-medium leading-relaxed max-w-2xl">
                    &ldquo;{report.description}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-8 text-slate-400">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] max-w-3xl w-full my-8 shadow-2xl border border-white/10 animate-slide-up overflow-hidden">
            {/* Modal Header */}
            <div className="px-10 py-10 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 relative">
              <div className="flex items-center gap-4 mb-4">
                <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${statusConfig[selectedReport.status].bg}`}>
                  <div className={`w-2 h-2 rounded-full ${statusConfig[selectedReport.status].dot}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${statusConfig[selectedReport.status].text}`}>
                    {selectedReport.status} Status
                  </span>
                </div>
                <div className="px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  ID: #{selectedReport.id?.slice(-6).toUpperCase()}
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Report Details</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="absolute top-10 right-10 p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-all"
              >
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-10 space-y-10">
              {/* Identifiers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {selectedReport.phoneNumber && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Phone</span>
                        <span className="font-mono font-black text-slate-900 dark:text-white">{selectedReport.phoneNumber}</span>
                      </div>
                    )}
                    {selectedReport.facebookId && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Facebook</span>
                        <span className="font-bold text-blue-600">{selectedReport.facebookId}</span>
                      </div>
                    )}
                    {selectedReport.instagramId && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Instagram</span>
                        <span className="font-bold text-purple-600">@{selectedReport.instagramId}</span>
                      </div>
                    )}
                    {selectedReport.otherId && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Other</span>
                        <span className="font-bold text-slate-900 dark:text-white">{selectedReport.otherId}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Submission Metadata</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Date</span>
                      <span className="font-bold text-slate-900 dark:text-white">{new Date(selectedReport.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Category</span>
                      <span className="font-bold text-blue-600">{scamTypeLabels[selectedReport.scamType] || selectedReport.scamType}</span>
                    </div>
                    {selectedReport.reportedByEmail && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Submitter</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{selectedReport.reportedByEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500/20 rounded-full" />
                <div className="pl-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Detailed Description</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium italic">
                    &ldquo;{selectedReport.description}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                {selectedReport.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleReject(selectedReport.id!)}
                      className="flex-1 py-5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 font-black rounded-2xl border border-rose-100 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Report
                    </button>
                    <button
                      onClick={() => handleApprove(selectedReport.id!)}
                      className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Approve & Publish
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleDelete(selectedReport.id!)}
                    className="flex-1 py-5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 font-black rounded-2xl border border-rose-100 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Permanently
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
