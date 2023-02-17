import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
const routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  {
    path: 'create',
    component: CreateTodoComponent,
  },
  {
    path: 'edit/:id',
    component: CreateTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class TodoRoutingModule {}
