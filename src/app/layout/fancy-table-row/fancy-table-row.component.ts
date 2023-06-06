import { Component, Input } from '@angular/core';
import { FancyData } from '../shared/fancy-data';
import { IFancyColumn } from '../shared/fancy-column';

@Component({
  selector: '[app-fancy-table-row]',
  templateUrl: './fancy-table-row.component.html',
  styleUrls: ['./fancy-table-row.component.scss'],
})
export class FancyTableRowComponent {
  @Input()
  item: FancyData = new FancyData();

  @Input()
  columns: IFancyColumn[] = [];

  @Input()
  isDisabled: boolean = false;

  trackByColumn(index: number, item: IFancyColumn): string {
    return item.fieldName;
  }
}
