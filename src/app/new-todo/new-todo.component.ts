import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { TodoPriority } from '../shared/enums/todo-priority';
import { Todo } from '../shared/interfaces/todo';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent {

  timePickerMinDate = new Date().getTime();

  priorityItems = [
    {label: 'Low', value: 'LOW'},
    {label: 'Normal', value: 'NORMAL'},
    {label: 'High', value: 'HIGH'}
  ];

  newTodoForm = this.fb.group({
    title: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(32)] ],
    date: [ null, [Validators.required] ],
    priority: [ 'LOW' ]
  } );

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  get title() {
    return this.newTodoForm.get('title');
  }

  get date() {
    return this.newTodoForm.get('date');
  }

  get priority() {
    return this.newTodoForm.get('priority');
  }

  onSubmit() {
    const value = this.newTodoForm.value
    const todos = [...this.appService.todos.value, {
      title: value.title as string,
      done: false,
      date: Number(value.date),
      priority: TodoPriority[value.priority as keyof typeof TodoPriority]
    } ];

    this.appService.todos.next(todos);

    this.router.navigate( ['/'] );
  }

}
