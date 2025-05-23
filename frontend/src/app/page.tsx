"use client"; // Keep this if components use client-side features like hooks, though our new ones are static for now.

import React from 'react';
import Header from '@/components/Header'; // Assuming @ is configured for src path alias
import DreamJournalPage from '@/components/DreamJournalPage'; // Assuming @ is configured for src path alias

export default function Home() {
  return (
    <>
      <Header />
      <DreamJournalPage />
    </>
  );
}
