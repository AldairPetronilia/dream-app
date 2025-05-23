import React from 'react';
import DreamInputForm from './DreamInputForm';
import SimilarDreamsSection from './SimilarDreamsSection';
import TrendingDreamsSection from './TrendingDreamsSection';

const DreamJournalPage: React.FC = () => {
  return (
    <main className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
      <div className="layout-content-container flex flex-col w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-text-primary text-3xl sm:text-4xl font-bold tracking-tight">
            Dream Journal
          </h1>
          <p className="text-text-secondary text-sm sm:text-base font-normal mt-2">
            Record your dreams and explore shared experiences.
          </p>
        </div>
        <DreamInputForm />
        <SimilarDreamsSection />
        <TrendingDreamsSection />
      </div>
    </main>
  );
};

export default DreamJournalPage;
