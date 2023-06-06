export class DataSource<T> {
  allItems: T[];
  filteredItems: T[];
  paginatedItems: T[];

  constructor({ allItems, filteredItems, paginatedItems }: Partial<DataSource<T>> = {}) {
    this.allItems = allItems || [];
    this.filteredItems = filteredItems || this.allItems;
    this.paginatedItems = paginatedItems || this.filteredItems;
  }
}
