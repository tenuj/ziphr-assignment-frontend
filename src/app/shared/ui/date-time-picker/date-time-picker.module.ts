import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerComponent } from './date-time-picker.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DateTimePickerComponent
  ],
  declarations: [
    DateTimePickerComponent
  ]
})
export class DateTimePickerModule { }
