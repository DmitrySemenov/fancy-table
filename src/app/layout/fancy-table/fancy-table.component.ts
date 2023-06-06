import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FancyData } from '../shared/fancy-data';
import { FieldSortOrder } from 'src/app/core/collections';
import { IFancyColumn, SelectableFancyColumn } from '../shared/fancy-column';

@Component({
  selector: 'app-fancy-table',
  templateUrl: './fancy-table.component.html',
  styleUrls: ['./fancy-table.component.scss'],
})
export class FancyTableComponent {
  @Input()
  items: FancyData[] = [];

  @Input()
  sortOrder: FieldSortOrder | null = null;

  @Input()
  isLoading: boolean = false;

  @Input()
  isFailed: boolean = false;

  @Input()
  columnsFilter: SelectableFancyColumn[] = [];

  @Output()
  readonly sortOrderChanged: EventEmitter<FieldSortOrder>;

  @Output()
  readonly refreshData: EventEmitter<void>;

  get selectedColumns() {
    return this.columnsFilter.filter((column) => column.isSelected);
  }

  constructor() {
    this.sortOrderChanged = new EventEmitter();
    this.refreshData = new EventEmitter();
  }

  trackByItem(index: number, item: FancyData): string {
    return item.id;
  }

  trackByColumn(index: number, item: IFancyColumn): string {
    return item.fieldName;
  }

  onSortOrderChanged(sortOrder: FieldSortOrder) {
    this.sortOrderChanged.emit(sortOrder);
  }

  onTryLoad() {
    this.refreshData.emit();
  }
}
