import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { coreConfig } from 'src/app/core/core.config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PageEvent } from '@angular/material/paginator';
import { SelectableFancyColumn } from '../shared/fancy-column';

@UntilDestroy()
@Component({
  selector: 'app-fancy-table-header',
  templateUrl: './fancy-table-header.component.html',
  styleUrls: ['./fancy-table-header.component.scss'],
})
export class FancyTableHeaderComponent implements OnInit {
  @Input()
  itemsCount: number = 0;

  @Input()
  page: number = 1;

  @Input()
  pageSize: number = coreConfig.pagination.defaultPageSize;

  @Input()
  columnsFilter: SelectableFancyColumn[] = [];

  @Output()
  readonly pageChanged: EventEmitter<number>;

  @Output()
  readonly filterChanged: EventEmitter<string>;

  @Output()
  readonly pageSizeChanged: EventEmitter<number>;

  @Output()
  readonly refresh: EventEmitter<void>;

  filter: string = '';
  state: {
    filter$: Subject<string>;
  };
  columnsFilterSelection: SelectableFancyColumn[] = [];

  get pageSizeOptions(): number[] {
    return coreConfig.pagination.pageSizeOptions;
  }

  constructor() {
    this.state = {
      filter$: new Subject(),
    };

    this.pageChanged = new EventEmitter();
    this.filterChanged = new EventEmitter();
    this.pageSizeChanged = new EventEmitter();
    this.refresh = new EventEmitter();
  }

  ngOnInit(): void {
    this.state.filter$
      .pipe(untilDestroyed(this), debounceTime(coreConfig.filter.textFilterDebounceTime), distinctUntilChanged())
      .subscribe((filter: string) => this.filterChanged.emit(filter));

    this.columnsFilterSelection = this.columnsFilter.filter((column) => column.isSelected);
  }

  onColumnsFilterSelected(columnsFilterSelections: SelectableFancyColumn[]) {
    this.columnsFilter.forEach((column: SelectableFancyColumn) => {
      column.isSelected = columnsFilterSelections.includes(column);
    });

    this.columnsFilterSelection = columnsFilterSelections;
  }

  onFilterChanged(filter: string) {
    this.state.filter$.next(filter);
  }

  onPageChanged(page: PageEvent) {
    const pageIndex = page.pageIndex + 1;
    if (this.page !== pageIndex) {
      this.pageChanged.emit(pageIndex);
    }

    if (this.pageSize !== page.pageSize) {
      this.pageSizeChanged.emit(page.pageSize);
    }
  }

  onRefresh() {
    this.refresh.next();
  }
}
