import { Component, OnInit } from '@angular/core';
import { DataSource, DataSourceService, DataSourceState, FieldSortOrder } from 'src/app/core/collections';
import { FancyData } from '../shared/fancy-data';
import { fancyConfig } from '../fancy.config';
import { coreConfig } from 'src/app/core/core.config';
import { FancyApiService } from '../fancy-api.service';
import { SelectableFancyColumn } from '../shared/fancy-column';
import { map } from 'lodash-es';

@Component({
  selector: 'app-fancy-table-container',
  templateUrl: './fancy-table-container.component.html',
  styleUrls: ['./fancy-table-container.component.scss'],
})
export class FancyTableContainerComponent implements OnInit {
  dataSource: DataSource<FancyData>;

  dataSourceState: DataSourceState<FancyData>;

  columnsFilter: SelectableFancyColumn[] = [];

  state: {
    isLoading: boolean;
    isFailed: boolean;
  };

  constructor(private dataSourceService: DataSourceService, private fancyApiService: FancyApiService) {
    this.dataSource = new DataSource<FancyData>();

    this.dataSourceState = new DataSourceState<FancyData>({
      filter: '',
      searchableFields: fancyConfig.containers.filter.searchableFields,
      sortOrder: new FieldSortOrder(
        fancyConfig.containers.list.defaultSortOrder.fieldName,
        fancyConfig.containers.list.defaultSortOrder.sortOrder
      ),
      page: 1,
      pageSize: coreConfig.pagination.defaultPageSize,
    });

    this.state = {
      isLoading: false,
      isFailed: false,
    };
  }

  ngOnInit(): void {
    this.columnsFilter = map(fancyConfig.fancyColumns, (column) => new SelectableFancyColumn({ ...column, isSelected: true }));

    this.loadFancyData();
  }

  onPageChanged(page: number) {
    this.dataSourceState.page = page;
    this.dataSource = this.dataSourceService.paginateDataSource(this.dataSource, this.dataSourceState);
  }

  onFilterChanged(filter: string) {
    this.dataSourceState.page = 1;
    this.dataSourceState.filter = filter;
    this.dataSource = this.dataSourceService.filterDataSource(this.dataSource, this.dataSourceState);
  }

  onPageSizeChanged(pageSize: number) {
    this.dataSourceState.page = 1;
    this.dataSourceState.pageSize = pageSize;
    this.dataSource = this.dataSourceService.paginateDataSource(this.dataSource, this.dataSourceState);
  }

  onSortOrderChanged(sortOrder: FieldSortOrder) {
    this.dataSourceState.sortOrder = sortOrder;
    this.dataSource = this.dataSourceService.filterDataSource(this.dataSource, this.dataSourceState);
  }

  async onTryLoad() {
    this.loadFancyData();
  }

  private async loadFancyData(): Promise<void> {
    this.state.isFailed = false;
    this.state.isLoading = true;

    try {
      const data = await this.fancyApiService.getFancyData();
      this.dataSource = this.dataSourceService.createDataSource(data, this.dataSourceState);
    } catch (error) {
      this.dataSource = new DataSource<FancyData>();
      this.state.isFailed = true;
    } finally {
      this.state.isLoading = false;
    }
  }
}
