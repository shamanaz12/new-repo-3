'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-lg text-emerald-700">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
};

export default HomePage;
