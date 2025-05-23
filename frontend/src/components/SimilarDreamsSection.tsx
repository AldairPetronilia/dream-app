import React from 'react';

interface DreamerProfileProps {
  imageUrl: string;
  name: string;
  dreamTheme: string;
}

const DreamerProfileCard: React.FC<DreamerProfileProps> = ({ imageUrl, name, dreamTheme }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-secondary-dark hover:bg-secondary-light transition-colors duration-200 cursor-pointer">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 border-2 border-primary-light"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <div className="text-center">
        <p className="text-text-primary text-sm font-medium">{name}</p>
        <p className="text-text-secondary text-xs">{dreamTheme}</p>
      </div>
    </div>
  );
};

const SimilarDreamsSection: React.FC = () => {
  // Hardcoded data as per the HTML
  const dreamers: DreamerProfileProps[] = [
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPsWGqfvLISoBCDnSnrxayU8cWWslIxryA59fmB6ncn55sP3opGuZlpmIwlc8nS0GUqICxacEGc34f6fk4SyxIqLgA7QZTU7TOLD0C4Gi9kwr81MNarsp2RGdDPwLpFQrkIvgz5-5H1GcMzTWbNzsocKqRA46omT_kFBjZ0COowcYczWrxBbw7LiAVFU0JMBE61FhoFyNGau1zxw5VY7yNcFYadeYrurqXBPKENXIvFW0ctUWrxfTc_K3F3FZ69QJ6WL8HG6WS7UvL",
      name: "Liam",
      dreamTheme: "Flying",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuBD6TPXtDBVttZpJggdrqvyoTG9kCo8kF2B7-75FW9s13kmpaX3NCRKdNKj6aUhu-8De8TU-KikRqukMg4mx-Aah_-KQgOckv_-GZ7EysRvSULbFuyxiY6-jpNrPFb-X5xBuHlbtSnneGTcvg42hK2jfAPTJy8GXfc06rSADC61qYz_RrALBdtbDAnehswnEKbffryw-6c8Eq4CkMauOrsGEji3yPF8xLKsjjM-d-juD2ydRuIOkwg5n-4NVEvMmwdCyjhrwW-21p",
      name: "Olivia",
      dreamTheme: "Mysterious forest",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIzff7jgQWiBkCxD-Q9RrDmL0I8sZqSAngvAF1JLwqrwAxaZErfhaVneWFStdkVy3x7TovbYdFq6ROmj08y8-nXYSazImGaILAmoobOQNyRiMk9rn4g90p51WVATkwiz2AuKTbfY2bh3XKnD59HA9eGepsHCZ5eEwwB7Rv_2kjOEBwakDn64uiy7srv5Oqi75MXMtXcT2cYJ1mY3HzYJibGLdbGRPL3WsDhBLhwz383qd5FurG5pSJH3hetdsJr9o6aP0KD6zbGbEe",
      name: "Noah",
      dreamTheme: "Talking animal",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAtVA_U1coSxWrsXrsejOpxuQhiGdDanXo69jkpJ2SoE-BpkyX8e_0egTags-NyG9vJAzSiAnwVzihtPCGsuCpToyIJlrqZ8n8RH2V8DF_RXhYCI9L1BE1LtIT6XY9yT9jworXbZOLeTwtKJMOozzjMno9eDA74jIJ11J3Mnt9bpRPFg7o4_ZQcU1_WVFOKJRNrZ4L32PTc21Qc2r_sutyD2sZItbW3JmCv0Bh9veA28R92G0_8MuPncqEU_57v58aaJjrCnS4D1ie",
      name: "Ava",
      dreamTheme: "Lost city",
    },
    {
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJcq4dY2m75e_iWU5hjog8Uux8I1fCIxnhhPl855iK29UXgd69C8OZNLUKJc_u0Btx_vb-3-tNGZhjUZUdrKLxjm5DjyBsGxO3MuUMLW-byL7euVrJhSjlQTpBgnzp45pEFRP9hhZSChequXIjwACVVL7mitbbOD-ywP6Kpv7fqUrlsIKvS07Uz-ev3e4UehTM87hkPp5-9n71qCQBfEvkT88JjqoFCvLqm527ai80M7MH8Mo05fCy2zqnWtiy4feK8Lf6lNjxEpDv",
      name: "Ethan",
      dreamTheme: "Journey",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-text-primary text-2xl font-bold tracking-tight mb-4">
        People with Similar Dreams
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {dreamers.map((dreamer) => (
          <DreamerProfileCard
            key={dreamer.name}
            imageUrl={dreamer.imageUrl}
            name={dreamer.name}
            dreamTheme={dreamer.dreamTheme}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarDreamsSection;
