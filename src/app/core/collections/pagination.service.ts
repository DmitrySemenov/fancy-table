import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  getPageItems<T>(allItems: T[], page: number, pageSize: number): T[] {
    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    const pageItems = allItems.slice(from, to);

    return pageItems;
  }
}
