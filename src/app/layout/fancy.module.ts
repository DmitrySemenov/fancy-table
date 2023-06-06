import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FancyTableContainerComponent } from './fancy-table-container/fancy-table-container.component';
import { FancyTableHeaderComponent } from './fancy-table-header/fancy-table-header.component';
import { FancyTableRowComponent } from './fancy-table-row/fancy-table-row.component';
import { FancyTableComponent } from './fancy-table/fancy-table.component';
import { CoreModule } from '../core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent, FancyTableContainerComponent, FancyTableComponent, FancyTableHeaderComponent, FancyTableRowComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class FancyModule {}
