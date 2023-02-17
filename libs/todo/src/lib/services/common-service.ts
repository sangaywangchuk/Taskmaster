import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selectors from '../state/selectors';
import * as actions from '../state/actions';
import { filter, Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { BaseStoreService, Todo } from '@lib/shared';
import { TodoState } from '../state/reducer';
import { FormBuilderService } from './form-builder';
import { FormGroup } from '@angular/forms';

/**
 * @class TodoCommonService
 * @extends BaseStoreService
 * @description A facade service for Todo data
 * @constructor
 * @param store The NGRX store
 * @param formBuilder A service to build Todo forms
 */
@Injectable()
export class TodoCommonService extends BaseStoreService<TodoState> {
  /**
   * @property {Observable<Todo[]>} todoList$
   * @description An observable of all Todos as an array
   */
  readonly todoList$: Observable<Todo[]> = this.selectState<Todo[]>(
    selectors.selectAllTodo,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<Dictionary<Todo>>} todoEntities$
   * @description An observable of all Todos as a dictionary of Todos
   */
  readonly todoEntities$: Observable<Dictionary<Todo>> = this.selectState(
    selectors.selectTodoEntities,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<string[] | number[]>} todoIds$
   * @description An observable of all Todo IDs as an array
   */
  readonly todoIds$: Observable<string[] | number[]> = this.selectState(
    selectors.selectTodoIds,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<number>} todoTotal$
   * @description An observable of the total number of Todos
   */
  readonly todoTotal$: Observable<number> = this.selectState(
    selectors.selectTodoTotal,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<Todo | undefined>} selectedTodo$
   * @description An observable of the selected Todo, if any
   */
  readonly selectedTodo$: Observable<Todo | undefined> = this.selectState(
    selectors.selectedTodo,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<Todo[]>} selectFilteredTodoList$
   * @description An observable of Todos filtered by a search term
   */
  readonly selectFilteredTodoList$ = this.selectState<Todo[]>(
    selectors.selectTodoBySearchTerm,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<Todo[]>} selectSortedTodoList$
   * @description An observable of Todos sorted by date
   */
  readonly selectSortedTodoList$ = this.selectState<Todo[]>(
    selectors.selectAllTodoSorted,
  ).pipe(filter((res) => !!res));

  /**
   * @property {Observable<Todo[]>} selectGlobalSearchTodo$
   * @description An observable of Todos filtered by a global search term
   */
  readonly selectGlobalSearchTodo$ = this.selectState<Todo[]>(
    selectors.selectGlobalSearchTodo,
  ).pipe(filter((res) => !!res));

  readonly selectSortAscending$ = this.selectState<boolean>(
    selectors.selectSortAscending,
  );

  /**
   * @constructor
   * @param store The NGRX store
   * @param formBuilder A service to build Todo forms
   */
  constructor(
    store: Store<TodoState>,
    private formBuilder: FormBuilderService,
  ) {
    super(store);
  }

  /**
   * Builds a Todo form group.
   * @param todo - optional Todo to initialize form group values.
   * @returns FormGroup for Todo.
   */
  buildTodoForm(todo?: Todo): FormGroup {
    return this.formBuilder?.buildTodoForm(todo);
  }

  /**
   * Triggers an action to toggle the sort order.
   */
  onToggleSort(): void {
    this.dispatchAction(actions.onToggleSort());
  }

  /**
   * Triggers an action to set the search term.
   * @param term - Search term to set.
   */
  setSearchTerm(term: string): void {
    this.dispatchAction(actions.setSearchTerm(term));
  }

  /**
   * Triggers an action to get all Todos.
   */
  getAllTodo(): void {
    this.dispatchAction(actions.getAllTodo());
  }

  /**
   * Triggers an action to fetch Todo by id.
   * @param id - Todo id to fetch.
   */
  fetchTodoById(id: string): void {
    this.dispatchAction(actions.fetchTodoById(id));
  }

  /**
   * Triggers an action to create Todo.
   * @param payload - Todo to create.
   */
  createTodo(payload: Todo): void {
    this.dispatchAction(actions.createTodo(payload));
  }

  /**
   * Triggers an action to delete Todo.
   * @param id - Todo id to delete.
   */
  deleteTodo(id: string): void {
    this.dispatchAction(actions.deleteTodo(id));
  }

  /**
   * Triggers an action to update Todo.
   * @param todo - Todo to update.
   */
  updateTodo(todo: Todo): void {
    this.dispatchAction(actions.editTodo(todo));
  }

  /**
   * Triggers an action to set selected Todo attribute.
   * @param attr - Attribute to set.
   */
  setSelectedTodoAttr(attr: string): void {
    this.dispatchAction(actions.setSelectedTodoAttr(attr));
  }

  /**
   * Triggers an action to reset store.
   */
  resetStore(): void {
    this.dispatchAction(actions.resetStore());
  }
}
