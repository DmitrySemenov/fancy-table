import { Injectable } from '@angular/core';
import { reject, map, unionWith } from 'lodash-es';
import { SortService } from './sort.service';
import { PaginationService } from './pagination.service';
import { FieldSortOrder } from './field-sort-order';
import { FilterService } from './filter.service';
import { DataSourceState } from './data-source-state';
import { DataSource } from './data-source';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private readonly sortService: SortService;
  private readonly paginationService: PaginationService;
  private readonly filterService: FilterService;

  constructor(sortService: SortService, paginationService: PaginationService, filterService: FilterService) {
    this.sortService = sortService;
    this.paginationService = paginationService;
    this.filterService = filterService;
  }

  createDataSource<T extends object>(items: T[], state: DataSourceState<T>): DataSource<T> {
    const filteredItems = this.filterItems<T>(items, state.filter, state.customFilter, state.searchableFields, state.fieldsMappers);
    const sortedItems = this.sortItems<T>(filteredItems, state.sortOrder);
    const paginatedItems = this.paginateItems(sortedItems, state.page, state.pageSize);

    const dataSource = new DataSource<T>({
      allItems: items,
      filteredItems: sortedItems,
      paginatedItems: paginatedItems,
    });

    return dataSource;
  }

  filterDataSource<T extends object>(dataSource: DataSource<T>, state: DataSourceState<T>): DataSource<T> {
    const filteredItems = this.filterItems<T>(
      dataSource.allItems,
      state.filter,
      state.customFilter,
      state.searchableFields,
      state.fieldsMappers
    );
    const sortedItems = this.sortItems<T>(filteredItems, state.sortOrder);
    const paginatedItems = this.paginateItems(sortedItems, state.page, state.pageSize);

    const filteredDataSource = new DataSource<T>({
      allItems: dataSource.allItems,
      filteredItems: sortedItems,
      paginatedItems: paginatedItems,
    });

    return filteredDataSource;
  }

  sortDataSource<T extends object>(dataSource: DataSource<T>, state: DataSourceState<T>): DataSource<T> {
    let filteredItems;
    if (state.sortOrder && state.sortOrder.order) {
      filteredItems = this.sortItems(dataSource.filteredItems, state.sortOrder);
    } else {
      filteredItems = this.filterItems(dataSource.allItems, state.filter, state.customFilter, state.searchableFields, state.fieldsMappers);
    }

    const paginatedItems = this.paginateItems(filteredItems, state.page, state.pageSize);

    const sortedDataSource = new DataSource<T>({
      allItems: dataSource.allItems,
      filteredItems: filteredItems,
      paginatedItems: paginatedItems,
    });

    return sortedDataSource;
  }

  paginateDataSource<T extends object>(dataSource: DataSource<T>, state: DataSourceState<T>): DataSource<T> {
    const paginatedItems = this.paginateItems(dataSource.filteredItems, state.page, state.pageSize);

    const paginatedDataSource = new DataSource<T>({
      allItems: dataSource.allItems,
      filteredItems: dataSource.filteredItems,
      paginatedItems: paginatedItems,
    });

    return paginatedDataSource;
  }

  deleteItemFromDataSource<T extends object>(
    dataSource: DataSource<T>,
    state: DataSourceState<T>,
    itemToDelete: T,
    itemsComparator?: (first: T, second: T) => boolean
  ): DataSource<T> {
    const rejectPredicate = itemsComparator ? (value: T) => itemsComparator(itemToDelete, value) : (value: T) => value === itemToDelete;

    const updatedItems = reject(dataSource.allItems, rejectPredicate);

    const updatedDataSource = this.createDataSource(updatedItems, state);
    return updatedDataSource;
  }

  addItemToDataSource<T extends object>(
    dataSource: DataSource<T>,
    state: DataSourceState<T>,
    newItem: T,
    itemsComparator?: (first: T, second: T) => boolean
  ): DataSource<T> {
    const updatedItems = itemsComparator ? unionWith([newItem], dataSource.allItems, itemsComparator) : [newItem, ...dataSource.allItems];

    const updatedDataSource = this.createDataSource(updatedItems, state);
    return updatedDataSource;
  }

  updateItemInDataSource<T extends object>(
    dataSource: DataSource<T>,
    state: DataSourceState<T>,
    updatedItem: T,
    itemsComparator?: (first: T, second: T) => boolean
  ): DataSource<T> {
    const searchPredicate = itemsComparator ? (value: T) => itemsComparator(updatedItem, value) : (value: T) => value === updatedItem;

    const updatedItems = map(dataSource.allItems, (value: T) => (searchPredicate(value) ? updatedItem : value));

    const updatedDataSource = this.createDataSource(updatedItems, state);
    return updatedDataSource;
  }

  private sortItems<T>(items: T[], sortOrder: FieldSortOrder | null): T[] {
    if (!sortOrder || !sortOrder.order) {
      return items;
    }

    const sortedItems = this.sortService.sort(items, sortOrder.fieldName, sortOrder.order);

    return sortedItems;
  }

  private paginateItems<T>(items: T[], page: number, pageSize: number): T[] {
    const pageItems = this.paginationService.getPageItems(items, page, pageSize);
    return pageItems;
  }

  private filterItems<T extends object>(
    items: T[],
    filter: string,
    customFilter?: Mapper<T[], T[]>,
    searchableFields?: FieldsOf<T>,
    fieldsMappers?: PropertyMapper<T, string>
  ): T[] {
    let filteredItems = this.filterService.filter(items, filter, searchableFields, fieldsMappers);

    if (customFilter) {
      filteredItems = customFilter(filteredItems);
    }

    return filteredItems;
  }
}
