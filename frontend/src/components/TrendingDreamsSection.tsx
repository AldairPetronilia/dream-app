import React from 'react';

interface TrendingDream {
  description: string;
  frequency: number;
}

const TrendingDreamsSection: React.FC = () => {
  // Hardcoded data as per the HTML
  const trendingDreams: TrendingDream[] = [
    { description: "Flying over a city", frequency: 120 },
    { description: "Meeting a childhood friend", frequency: 95 },
    { description: "Exploring an unknown world", frequency: 80 },
    { description: "Solving a puzzle", frequency: 75 },
    { description: "Discovering a hidden talent", frequency: 60 },
  ];

  return (
    <section>
      <h2 className="text-text-primary text-2xl font-bold tracking-tight mb-4">
        Trending Dreams
      </h2>
      <div className="overflow-hidden rounded-xl border border-secondary-light bg-secondary-dark">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-text-primary text-sm font-medium">
                Dream
              </th>
              <th className="px-4 py-3 text-left text-text-primary text-sm font-medium w-32 sm:w-40">
                Frequency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-light">
            {trendingDreams.map((dream, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-text-primary text-sm font-normal">
                  {dream.description}
                </td>
                <td className="px-4 py-3 text-text-secondary text-sm font-normal">
                  {dream.frequency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TrendingDreamsSection;
