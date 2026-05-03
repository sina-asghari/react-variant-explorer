import React from 'react';
import { VariantExplorerProps } from '../types';
import { VariantRow } from './VariantRow';

export const VariantExplorer: React.FC<VariantExplorerProps> = ({ 
  variants, 
  onActivityClick,
  theme = 'system',
  className = '',
  style 
}) => {
  const themeClass = theme === 'system' ? '' : `rve-theme-${theme}`;
  
  return (
    <div className={`rve-container ${themeClass} ${className}`} style={style}>
      {variants.map((variant) => (
        <VariantRow 
          key={variant.id} 
          variant={variant} 
          onActivityClick={onActivityClick}
        />
      ))}
    </div>
  );
};
