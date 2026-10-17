export const APP_NAME = '材料性能数据库';
export const APP_DESCRIPTION = '用于存储、检索、对比和管理各种材料性能数据的数据库系统';

export const DataSourceTypeLabels = {
  LITERATURE: '文献',
  HANDBOOK: '手册',
  EXPERIMENT: '实验',
  SUPPLIER: '供应商',
  WEBSITE: '网站',
  OTHER: '其他',
} as const;

export const DataSourceTypeOptions = [
  { value: 'LITERATURE', label: '文献' },
  { value: 'HANDBOOK', label: '手册' },
  { value: 'EXPERIMENT', label: '实验' },
  { value: 'SUPPLIER', label: '供应商' },
  { value: 'WEBSITE', label: '网站' },
  { value: 'OTHER', label: '其他' },
];
