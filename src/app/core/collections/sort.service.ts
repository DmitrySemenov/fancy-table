import { Injectable } from '@angular/core';
import { orderBy, isArray, fill } from 'lodash-es';
import { SortOrder } from './sort-order';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  sort<T>(items: T[], fields: string | string[], sortOrders: SortOrder | SortOrder[]): T[] {
    if (isArray(fields) && fields.length > 1 && !isArray(sortOrders)) {
      sortOrders = fill(Array(fields.length), sortOrders);
    }

    const sortedItems = orderBy(items, fields, sortOrders);
    return sortedItems;
  }
}
