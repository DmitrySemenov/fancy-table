import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FieldSortOrder, SortOrder } from '../../collections';

@Component({
  selector: 'app-sortable-table-header',
  templateUrl: './sortable-table-header.component.html',
  styleUrls: ['./sortable-table-header.component.scss'],
})
export class SortableTableHeaderComponent {
  @Input()
  fieldName: string | string[] = '';

  @Input()
  fieldSortOrder: FieldSortOrder | null = null;

  @Output()
  readonly sortOrderChanged: EventEmitter<FieldSortOrder>;

  constructor() {
    this.sortOrderChanged = new EventEmitter();
  }

  get order(): SortOrder | null {
    const order = this.isActive && this.fieldSortOrder ? this.fieldSortOrder.order : null;
    return order;
  }

  get isActive(): boolean {
    const isActive = this.fieldSortOrder?.fieldName === this.fieldName;
    return isActive;
  }

  get isAscOrder(): boolean {
    return this.order === SortOrder.asc;
  }

  get isDescOrder(): boolean {
    return this.order === SortOrder.desc;
  }

  onOrderChanged() {
    let sortOrder: SortOrder | null;

    switch (this.order) {
      case SortOrder.desc:
        sortOrder = null;
        break;
      case SortOrder.asc:
        sortOrder = SortOrder.desc;
        break;
      default:
        sortOrder = SortOrder.asc;
        break;
    }

    const fieldSortOrder = new FieldSortOrder(this.fieldName, sortOrder);
    this.sortOrderChanged.emit(fieldSortOrder);
  }
}
