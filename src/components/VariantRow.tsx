import React from 'react';
import { Variant, VariantStepData } from '../types';
import { VariantStep } from './VariantStep';

interface VariantRowProps {
  variant: Variant;
  onActivityClick?: (data: VariantStepData, variant: Variant) => void;
}

export const VariantRow: React.FC<VariantRowProps> = ({ variant, onActivityClick }) => {
  return (
    <div className="rve-row">
      <div className="rve-row-info">
        <span className="rve-row-rank">Variant {variant.rank}</span>
        <span className="rve-row-freq">{variant.frequency} cases ({variant.percentage}%)</span>
      </div>
      <div className="rve-steps-container">
        {variant.steps.map((step, index) => (
          <VariantStep 
            key={`${variant.id}-step-${index}`}
            data={step}
            onClick={() => onActivityClick?.(step, variant)}
          />
        ))}
      </div>
    </div>
  );
};
