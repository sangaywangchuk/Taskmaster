import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Todo } from '@lib/shared';
import { UntilDestroy } from '@ngneat/until-destroy';
import { firstValueFrom } from 'rxjs';
import { CATEGORY } from '../../models/constants/todo.constants';
import { TodoCommonService } from '../../services/common-service';
/**
 * @title CreateTodoComponent
 * @desc component for creating and updating todo item
 * Decorates the component and indicates that it should be destroyed automatically when its containing 
 * component is destroyed
 */
@UntilDestroy()
@Component({
  selector: 'todo-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  /**
   * The reactive form for creating and updating todo items
   */
  todoForm?: FormGroup;

  /**
   * The id of the todo item being updated
   */
  id?: string;

  /**
   * The category object that holds different Todo Attributes options
   */
  category: Category = CATEGORY;

  /**
   * Injects the TodoCommonService and the Angular Router and ActivatedRoute services
   *
   * @param service - the TodoCommonService for accessing the todo store
   * @param route - the ActivatedRoute service for accessing the current route
   * @param router - the Router service for navigating to different routes
   */
  constructor(
    private cService: TodoCommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.initializer();
  }

  /**
   * Initializes the component's form
   */
  initializer(): void {
    this.initializeForm();
  }

  /**
   * Initializes the todo form either with a new form or with the data of an existing todo item or else call api to fetch data
   */
  async initializeForm(): Promise<void> {
    this.id = this.route?.snapshot?.params['id'];
    if (!this.id) {
      this.todoForm = this.cService.buildTodoForm();
    } else {
      const todoEntities = await firstValueFrom(this.cService.todoEntities$);
      this.todoForm =
        todoEntities[this.id] &&
        this.cService.buildTodoForm(todoEntities[this.id]);
      if (!todoEntities[this.id]) {
        this.cService.fetchTodoById(this.id);
        const todo = await firstValueFrom(this.cService.selectedTodo$);
        this.todoForm = this.cService.buildTodoForm(todo);
      }
    }
  }

  /**
   * Submit the form.
   *
   * If the id of the todo is present, it updates the todo.
   * If the id of the todo is not present, it creates a new todo.
   */
  onSubmit(): void {
    this.id ? this.onUpdate() : this.onCreate();
  }

  /**
   * Create a new todo.
   *
   * Creates a new todo with the data from the form and calls the facade to persist the data.
   * Then, it sets the form to an empty form and navigates back to the todo list.
   */
  onCreate(): void {
    const payload = {
      ...this.todoForm?.value,
      createdAt: new Date(),
      id: Date.now(),
    } as Todo;
    this.cService.createTodo(payload);
    this.todoForm = this.cService.buildTodoForm();
    this.router.navigateByUrl('/todo');
  }

  /**
   * Update an existing todo.
   *
   * Updates the todo with the data from the form and calls the facade to persist the data.
   * Then, it sets the form to an empty form and navigates back to the todo list.
   */
  onUpdate(): void {
    const payload = {
      ...this.todoForm?.value,
      createdAt: new Date(),
    } as Todo;
    this.cService.updateTodo(payload);
    this.todoForm = this.cService.buildTodoForm();
    this.router.navigateByUrl('/todo');
  }

  /**
   * Navigate back to the todo list.
   */
  onReturnBack(): void {
    this.router.navigateByUrl('/todo');
  }
}
