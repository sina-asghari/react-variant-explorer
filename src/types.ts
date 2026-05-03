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
}

export interface VariantExplorerProps {
  variants: Variant[];
  onActivityClick?: (data: VariantStepData, variant: Variant) => void;
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  style?: React.CSSProperties;
}
