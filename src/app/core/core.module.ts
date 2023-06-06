import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsEmptyPipe, JoinPipe } from './utils';
import { SortableTableHeaderComponent } from './tables';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [IsEmptyPipe, JoinPipe, SortableTableHeaderComponent],
  imports: [CommonModule, HttpClientModule, MatIconModule],
  exports: [IsEmptyPipe, JoinPipe, SortableTableHeaderComponent],
})
export class CoreModule {}
