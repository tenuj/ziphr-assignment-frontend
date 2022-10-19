import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DropdownMenuComponent,
  ],
  declarations: [
    DropdownMenuComponent,

  ]
})
export class DropdownMenuModule { }
