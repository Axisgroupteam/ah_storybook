import type { Raw } from "vue";

export interface TableCellConfig {
  order: number;
  show: boolean;
  width: string;
}

export interface AppTablePropsInterface<T = any> {
  tableContent: TableHeaderWithConfig<T>[];
  color: string;
  items: T[];
}

export interface TableHeader<T = any> {
  key: keyof T;
  title: string;
  component?: Raw<any>;
}

export interface TableHeaderWithConfig<T = any> {
  key: keyof T;
  title: string;
  component?: Raw<any>;
  tableConfig: TableCellConfig;
}
