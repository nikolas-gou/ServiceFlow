import type { ReactNode } from 'react';
import type { PaletteColorKey } from './theme';
import type { DisplayValueRow } from './display';
import type { WindingGroup } from '../components/common/box/main/EnhancedMotorRepairDisplay/CombinedBoxInfoDisplay';

export interface StandardBoxConfig {
  title: string;
  color: PaletteColorKey;
  icon: ReactNode;
  titleTooltip?: ReactNode;
  includesConnection?: boolean;
  values: DisplayValueRow[];
}

export interface SplitBoxSide {
  title: string;
  color: PaletteColorKey;
  icon: ReactNode;
  values: DisplayValueRow[];
}

export interface SplitConfig {
  split: true;
  left: SplitBoxSide;
  right: SplitBoxSide;
}

export interface CombinedBoxConfig {
  combined: true;
  title: string;
  titleTooltip?: ReactNode;
  color: PaletteColorKey;
  icon: ReactNode;
  includesConnection?: boolean;
  groups: WindingGroup[];
  values: DisplayValueRow[];
}

export interface CoilConfig {
  title: string;
  color: PaletteColorKey;
  icon: ReactNode;
  groups: WindingGroup[];
  values: DisplayValueRow[];
}

export interface SplitCombinedConfig {
  splitCombined: true;
  left: CoilConfig;
  right: CoilConfig;
}

export type WindingConfig = StandardBoxConfig | SplitConfig | CombinedBoxConfig | SplitCombinedConfig;
