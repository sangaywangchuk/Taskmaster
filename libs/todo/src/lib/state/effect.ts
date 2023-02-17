import { Injectable } from '@angular/core';
import { Todo } from '@lib/shared';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { TodoApiService } from '../services/api-service';
import * as userActions from './actions';
/**
 * TodoEffects is an @Injectable class that is responsible for listening to the dispatched ngrx actions and performing side-effects as a result of these actions. 
 * This class uses the Actions class to get the latest action and TodoApiService to communicate with the API. 
 * 
 * @export
 * @class TodoEffects
 */
@Injectable()
export class TodoEffects {
  /**
   * Creates an instance of TodoEffects.
   *
   * @param {Actions} actions$
   * @param {TodoApiService} apiService
   * @memberof TodoEffects
   */
  constructor(private actions$: Actions, private apiService: TodoApiService) {}

  /**
   * loadTodoList$ is an observable stream that listens to the 'getAllTodo' action.
   * It uses the switchMap operator to switch to a new inner observable returned by the TodoApiService.getAllTodo() method.
   * Finally, it uses the map operator to return the 'setAllTodo' action with the response from the API.
   *
   * @memberof TodoEffects
   */
  loadTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllTodo),
      switchMap(() => this.apiService.getAllTodo()),
      map((res: Todo[]) => userActions.setAllTodo(res)),
    ),
  );

  /**
   * createTodo$ is an observable stream that listens to the 'createTodo' action.
   * It uses the switchMap operator to switch to a new inner observable returned by the TodoApiService.createTodo(todo) method.
   * Finally, it uses the map operator to return the 'onSuccessCreateTodo' action with the response from the API.
   *
   * @memberof TodoEffects
   */
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createTodo),
      switchMap(({ todo }) => this.apiService.createTodo(todo)),
      map((res: Todo) => userActions.createdTodo(res)),
    ),
  );

  /**
   * deleteTodo$ is an observable stream that listens to the 'deleteTodo' action.
   * It uses the switchMap operator to switch to a new inner observable returned by the TodoApiService.deleteTodo(id) method.
   * Finally, it uses the map operator to return the 'onSuccessDeleteTodo' action with the id passed as an argument.
   *
   * @memberof TodoEffects
   */
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteTodo),
      switchMap(({ id }) => {
        return this.apiService
          .deleteTodo(id)
          .pipe(map(() => userActions.deletedTodo(id)));
      }),
    ),
  );

  /**
   * An Effect that listens for the dispatch of `userActions.editTodo` action,
   * and updates the todo by calling the `apiService.editTodo` method.
   * Once the update is successful, it dispatches `userActions.onSuccessEditTodo` action.
   */
  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editTodo),
      switchMap(({ todo }) => this.apiService.editTodo(todo)),
      map((todo: Todo) => userActions.editedTodo(todo)),
    ),
  );

  /**
   * An Effect that listens for the dispatch of `userActions.fetchTodoById` action,
   * and fetches the todo by calling the `apiService.getTodoById` method.
   * Once the fetch is successful, it dispatches `userActions.onSuccessFetchTodoById` action.
   */
  fetchTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.fetchTodoById),
      switchMap(({ id }) => this.apiService.getTodoById(id)),
      map((todo: Todo) => userActions.fetchedTodoById(todo)),
    ),
  );
}
