import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './order-list.component';
import { OrderListService } from './order-list.service';
import { MaterialModule } from '../../material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CdkColumnDef } from '@angular/cdk/table';
import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PipesModule
  ],
  declarations: [
      OrderListComponent,
      ConfirmDialogComponent,
  ],
  exports: [
    OrderListComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    OrderListService,
    CdkColumnDef
  ]
})
export class OrderListModule {}
