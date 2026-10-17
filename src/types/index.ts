// 数据源类型
export const DataSourceTypes = {
  LITERATURE: 'LITERATURE',
  HANDBOOK: 'HANDBOOK',
  EXPERIMENT: 'EXPERIMENT',
  SUPPLIER: 'SUPPLIER',
  WEBSITE: 'WEBSITE',
  OTHER: 'OTHER',
} as const;

export type DataSourceType = typeof DataSourceTypes[keyof typeof DataSourceTypes];

// 筛选参数类型
export interface MaterialFilter {
  search?: string;
  categoryId?: string;
  categoryName?: string;
}

// 材料对比数据
export interface ComparisonItem {
  id: string;
  name: string;
  designation: string | null;
  properties: PropertyGroup[];
}

export interface PropertyGroup {
  category: string;
  properties: PropertyItem[];
}

export interface PropertyItem {
  name: string;
  value: string;
  unit: string | null;
}
