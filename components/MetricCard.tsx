
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  category?: 'GOOD' | 'NEEDS IMPROVEMENT' | 'POOR';
  score?: number;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, category, score, description }) => {
  const getCategoryColor = () => {
    if (category === 'GOOD') return 'text-green-500';
    if (category === 'NEEDS IMPROVEMENT') return 'text-orange-500';
    if (category === 'POOR') return 'text-red-500';
    
    if (typeof score === 'number') {
      if (score >= 0.9) return 'text-green-500';
      if (score >= 0.5) return 'text-orange-500';
      return 'text-red-500';
    }
    
    return 'text-gray-800';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center md:text-left">
      <h4 className="text-sm font-medium text-gray-600 mb-1">{title}</h4>
      <p className={`text-3xl font-bold ${getCategoryColor()}`}>{value}</p>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </div>
  );
};

export default MetricCard;
