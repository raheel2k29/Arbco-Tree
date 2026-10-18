import React, { Suspense } from 'react';
import ServiceAreasClient from '@/components/ServiceAreasClient';

export const metadata = {
  title: 'Townsville Service Areas | Arbco Tree Services',
  description:
    'Explore all 97 Greater Townsville suburbs serviced by Arbco Tree Services. Local Level 5 arborists providing tree removal, stump grinding, and palm cleaning.',
  alternates: {
    canonical: 'https://arbco-tree.vercel.app/service-areas',
  },
};

export default function ServiceAreasPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 py-32 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#036829]" />
          <p className="mt-4 text-slate-500 font-sans text-sm">Loading service areas...</p>
        </main>
      }
    >
      <ServiceAreasClient />
    </Suspense>
  );
}
