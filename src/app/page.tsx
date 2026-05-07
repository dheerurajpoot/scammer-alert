'use client';

import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { getFirebaseServices } from '@/hooks/useFirebase';
import { ScammerReport } from '@/lib/types';
import Hero from '@/components/Hero';
import SearchResults from '@/components/SearchResults';
import ReportForm from '@/components/ReportForm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ScammerReport[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults((prev) => (prev.length > 0 ? [] : prev));
      return;
    }

    setIsSearching(true);
    const { database } = getFirebaseServices();
    const reportsRef = ref(database, 'scammerReports');
    
    // Fetch all approved reports and search locally
    get(reportsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const results: ScammerReport[] = [];

        Object.entries(data).forEach(([id, report]) => {
          const reportData = report as ScammerReport;
          // Only show approved reports
          if (reportData.status !== 'approved') return;

          const query = searchQuery.toLowerCase();
          const matchesPhone = reportData.phoneNumber?.toLowerCase().includes(query);
          const matchesFacebook = reportData.facebookId?.toLowerCase().includes(query);
          const matchesInstagram = reportData.instagramId?.toLowerCase().includes(query);
          const matchesOther = reportData.otherId?.toLowerCase().includes(query);

          if (matchesPhone || matchesFacebook || matchesInstagram || matchesOther) {
            results.push({ ...reportData, id });
          }
        });

        setSearchResults(results);
      }
      setIsSearching(false);
    }).catch(() => {
      setIsSearching(false);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation onReportClick={() => setShowReportForm(true)} />
      
      {!showReportForm ? (
        <main>
          <Hero 
            onSearch={setSearchQuery}
            onReportClick={() => setShowReportForm(true)}
            searchQuery={searchQuery}
          />
          
          {searchQuery && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <SearchResults 
                results={searchResults} 
                isLoading={isSearching}
                query={searchQuery}
              />
            </div>
          )}
        </main>
      ) : (
        <ReportForm 
          onClose={() => {
            setShowReportForm(false);
            setReportSubmitted(false);
          }}
          onSubmitted={() => setReportSubmitted(true)}
        />
      )}
      <Footer />
    </div>
  );
}
