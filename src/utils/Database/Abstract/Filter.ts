type FilterValue =
  | string
  | number
  | boolean
  | { $gte?: number; $lte?: number; $in?: any[]; $ne?: any }
  | any;

export type Filters = Record<string, FilterValue>;