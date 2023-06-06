import { SortOrder } from './sort-order';

export class FieldSortOrder {
  fieldName: string | string[];
  order: SortOrder | null;

  constructor(fieldName: string | string[], order: SortOrder | null) {
    this.fieldName = fieldName;
    this.order = order;
  }
}
