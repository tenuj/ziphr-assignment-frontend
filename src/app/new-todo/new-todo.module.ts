import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTodoRoutingModule } from './new-todo-routing.module';
import { NewTodoComponent } from './new-todo.component';
import { DropdownMenuModule } from '../shared/ui/dropdown-menu/dropdown-menu.module';
import { DateTimePickerModule } from '../shared/ui/date-time-picker/date-time-picker.module';

@NgModule({
  declarations: [
    NewTodoComponent
  ],
  imports: [
    DropdownMenuModule,
    DateTimePickerModule,
    CommonModule,
    ReactiveFormsModule,
    NewTodoRoutingModule
  ]
})
export class NewTodoModule {
}
