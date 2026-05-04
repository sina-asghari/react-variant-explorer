import { Variant, VariantStepData, Column, VariantDesign } from '../types';
import { VariantStep } from './VariantStep';

interface VariantRowProps {
  variant: Variant;
  columns?: Column[];
  design?: VariantDesign;
  onActivityClick?: (data: VariantStepData, variant: Variant) => void;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export const VariantRow: React.FC<VariantRowProps> = ({ 
  variant, 
  columns = [],
  design = 'default',
  onActivityClick,
  isSelected,
  onSelect
}) => {
  return (
    <div className={`rve-row ${isSelected ? 'rve-row-selected' : ''} rve-design-${design}`}>
      <div className="rve-row-checkbox">
        <input 
          className="rve-checkbox-input"
          type="checkbox" 
          checked={isSelected} 
          onChange={(e) => onSelect?.(e.target.checked)}
        />
      </div>
      <div className="rve-row-info">
        <span className="rve-row-freq">{variant.frequency}</span>
        <span className="rve-row-rank">Variant {variant.rank}</span>
      </div>

      {columns.map(col => (
        <div key={col.key} className={`rve-row-col ${col.hiddenOnMobile ? 'hidden-mobile' : ''}`} style={{ width: col.width }}>
          {col.render ? col.render(variant) : variant[col.key]}
        </div>
      ))}

      <div className="rve-steps-container">
        {variant.steps.map((step, index) => (
          <VariantStep 
            key={`${variant.id}-step-${index}`}
            data={step}
            design={design}
            onClick={() => onActivityClick?.(step, variant)}
          />
        ))}
      </div>
    </div>
  );
};
