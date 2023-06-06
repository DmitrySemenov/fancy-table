import { FieldSortOrder } from './field-sort-order';

export class DataSourceState<T> {
  filter: string;
  customFilter?: Mapper<T[], T[]>;
  searchableFields?: FieldsOf<T>;
  fieldsMappers?: PropertyMapper<T, string>;
  sortOrder: FieldSortOrder | null;
  page: number;
  pageSize: number;

  constructor({ filter, customFilter, searchableFields, fieldsMappers, sortOrder, page, pageSize }: Partial<DataSourceState<T>> = {}) {
    this.filter = filter || '';
    this.customFilter = customFilter;
    this.searchableFields = searchableFields;
    this.fieldsMappers = fieldsMappers;
    this.sortOrder = sortOrder || null;
    this.page = page || 1;
    this.pageSize = pageSize || 10;
  }
}
