import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule),
  },
  {
    path: 'new',
    loadChildren: () => import('./new-todo/new-todo.module').then(m => m.NewTodoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
