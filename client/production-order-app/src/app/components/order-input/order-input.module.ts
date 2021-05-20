import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OrderInputComponent } from './order-input.component';
import { OrderInputService } from './order-input.service';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule, BrowserAnimationsModule],
  declarations: [OrderInputComponent],
  exports: [OrderInputComponent],
  entryComponents: [],
  providers: [OrderInputService]
})
export class OrderInputModule {}
