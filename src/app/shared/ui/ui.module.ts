import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuModule } from './dropdown-menu/dropdown-menu.module';
import { DateTimePickerModule } from './date-time-picker/date-time-picker.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownMenuModule,
    DateTimePickerModule
  ]
})
export class UiModule { }
