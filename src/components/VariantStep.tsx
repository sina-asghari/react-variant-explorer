import { VariantStepData, VariantDesign } from '../types';

interface VariantStepProps {
  data: VariantStepData;
  design?: VariantDesign;
  onClick?: () => void;
}

export const VariantStep: React.FC<VariantStepProps> = ({ data, design = 'default', onClick }) => {
  const isGrouped = Array.isArray(data);
  const isMinimal = design === 'minimal';
  const isCircles = design === 'circles';
  
  if (!isGrouped) {
    const activity = data;
    return (
      <div 
        className={`rve-step rve-design-${design}`}
        style={{ backgroundColor: activity.color || '#6366f1' }}
        onClick={onClick}
        title={activity.label}
      >
        {!isMinimal && !isCircles && <span className="rve-step-content">{activity.label}</span>}
      </div>
    );
  }

  const label = data.map(a => a.label).join(' > ');
  const maxDisplay = isMinimal || isCircles ? 4 : 3;
  const showMore = data.length > maxDisplay;
  const displayActivities = showMore ? data.slice(0, maxDisplay - 1) : data;
  const moreCount = data.length - (maxDisplay - 1);

  return (
    <div 
      className={`rve-step rve-step-grouped rve-design-${design}`}
      onClick={onClick}
      title={label}
    >
      {displayActivities.map((activity) => (
        <div 
          key={activity.id}
          className="rve-sub-step"
          style={{ backgroundColor: activity.color || '#6366f1' }}
          title={activity.label}
        >
          {!isMinimal && !isCircles && <span className="rve-step-content">{activity.label}</span>}
        </div>
      ))}
      {showMore && (
        <div className="rve-sub-step rve-sub-step-more">
          {!isMinimal && !isCircles && <span className="rve-step-content">+{moreCount}</span>}
          {(isMinimal || isCircles) && <span className="rve-plus-icon">+</span>}
        </div>
      )}
    </div>
  );
};
