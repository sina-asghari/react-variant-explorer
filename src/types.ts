export interface Activity {
  id: string;
  label: string;
  color?: string;
  metadata?: Record<string, any>;
}

/**
 * A step can be a single activity or multiple activities grouped together.
 */
export type VariantStepData = Activity | Activity[];

export interface Variant {
  id: string;
  steps: VariantStepData[];
  frequency: number;
  percentage: number;
  rank: number;
  [key: string]: any;
}

export type VariantDesign = 'default' | 'minimal' | 'circles';

export interface Column {
  key: string;
  header: React.ReactNode;
  render?: (variant: Variant) => React.ReactNode;
  width?: string | number;
  sortable?: boolean;
  hiddenOnMobile?: boolean;
}

export interface VariantExplorerProps {
  variants: Variant[];
  columns?: Column[];
  design?: VariantDesign;
  onActivityClick?: (data: VariantStepData, variant: Variant) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedIds?: string[];
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  style?: React.CSSProperties;
}
