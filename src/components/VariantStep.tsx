import React from 'react';
import { VariantStepData } from '../types';

interface VariantStepProps {
  data: VariantStepData;
  onClick?: () => void;
}

export const VariantStep: React.FC<VariantStepProps> = ({ data, onClick }) => {
  const isGrouped = Array.isArray(data);
  
  if (!isGrouped) {
    const activity = data;
    return (
      <div 
        className="rve-step"
        style={{ backgroundColor: activity.color || '#6366f1' }}
        onClick={onClick}
        title={activity.label}
      >
        <span className="rve-step-content">{activity.label}</span>
      </div>
    );
  }

  const label = data.map(a => a.label).join(' > ');
  const maxDisplay = 3;
  const showMore = data.length > maxDisplay;
  const displayActivities = showMore ? data.slice(0, maxDisplay - 1) : data;
  const moreCount = data.length - (maxDisplay - 1);

  return (
    <div 
      className="rve-step rve-step-grouped"
      onClick={onClick}
      title={label}
    >
      {displayActivities.map((activity) => (
        <div 
          key={activity.id}
          className="rve-sub-step"
          style={{ backgroundColor: activity.color || '#6366f1' }}
        >
          <span className="rve-step-content">{activity.label}</span>
        </div>
      ))}
      {showMore && (
        <div className="rve-sub-step rve-sub-step-more">
          <span className="rve-step-content">+{moreCount} more</span>
        </div>
      )}
    </div>
  );
};
