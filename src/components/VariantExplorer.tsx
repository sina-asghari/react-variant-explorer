import React, { useState, useMemo } from 'react';
import { VariantExplorerProps, Variant } from '../types';
import { VariantRow } from './VariantRow';

export const VariantExplorer: React.FC<VariantExplorerProps> = ({
  variants,
  columns = [],
  design = 'default',
  onActivityClick,
  onSelectionChange,
  selectedIds: controlledSelectedIds,
  theme = 'system',
  className = '',
  style
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' } | null>({ key: 'frequency', order: 'desc' });

  const selectedIds = controlledSelectedIds || internalSelectedIds;

  const themeClass = theme === 'system' ? '' : `rve-theme-${theme}`;

  const sortedVariants = useMemo(() => {
    if (!sortConfig) return variants;
    const { key, order } = sortConfig;

    return [...variants].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [variants, sortConfig]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected = e.target.checked ? variants.map(v => v.id) : [];
    if (!controlledSelectedIds) setInternalSelectedIds(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectRow = (id: string, selected: boolean) => {
    const newSelected = selected
      ? [...selectedIds, id]
      : selectedIds.filter(sid => sid !== id);

    if (!controlledSelectedIds) setInternalSelectedIds(newSelected);
    onSelectionChange?.(newSelected);
  };

  const toggleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, order: prev.order === 'asc' ? 'desc' : 'asc' };
      }
      return { key, order: 'desc' };
    });
  };

  const isAllSelected = variants.length > 0 && selectedIds.length === variants.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < variants.length;

  return (
    <div className={`rve-container ${themeClass} ${className}`} style={style}>
      <div className="rve-header">
        <div className="rve-header-checkbox">
          <input
            className="rve-checkbox-input"
            type="checkbox"
            checked={isAllSelected}
            ref={el => { if (el) el.indeterminate = isIndeterminate; }}
            onChange={handleSelectAll}
          />
        </div>
        <div className="rve-header-count" onClick={() => toggleSort('frequency')}>
          Count
          <span className={`rve-sort-icon ${sortConfig?.key === 'frequency' ? 'active' : ''}`}>
            {sortConfig?.key === 'frequency' ? (sortConfig.order === 'asc' ? '↑' : '↓') : '↕'}
          </span>
        </div>

        {columns.map(col => (
          <div
            key={col.key}
            className="rve-header-col"
            style={{ width: col.width }}
            onClick={() => col.sortable && toggleSort(col.key)}
          >
            {col.header}
            {col.sortable && (
              <span className={`rve-sort-icon ${sortConfig?.key === col.key ? 'active' : ''}`}>
                {sortConfig?.key === col.key ? (sortConfig.order === 'asc' ? '↑' : '↓') : '↕'}
              </span>
            )}
          </div>
        ))}

        <div className="rve-header-variants">Variants</div>
      </div>
      <div className="rve-rows-container">
        {sortedVariants.map((variant) => (
          <VariantRow
            key={variant.id}
            variant={variant}
            columns={columns}
            design={design}
            onActivityClick={onActivityClick}
            isSelected={selectedIds.includes(variant.id)}
            onSelect={(selected) => handleSelectRow(variant.id, selected)}
          />
        ))}
      </div>
    </div>
  );
};
