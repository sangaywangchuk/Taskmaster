import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService, Todo } from '@lib/shared';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
/**
 * Service that communicates with the user API to perform CRUD operations on todo data.
 */
@Injectable({
  providedIn: 'root',
})
export class TodoApiService extends BaseApiService {
  /**
   * Creates an instance of the TodoApiService.
   * @param http - The HttpClient instance for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = `http://localhost:3000/`;
  }

  /**
   * Gets all todos from the API.
   * @returns An Observable of an array of Todos.
   */
  getAllTodo(): Observable<Todo[]> {
    return this.get<Todo[]>('todos', 2).pipe(
      catchError(() => of([])),
      map((res: Todo[]) => res),
    );
  }

  /**
   * Gets a single todo by its ID from the API.
   * @param id - The ID of the Todo to retrieve.
   * @returns An Observable of a Todo.
   */
  getTodoById(id: string): Observable<Todo> {
    return this.get<Todo>(`todos/${id}`).pipe();
  }

  /**
   * Creates a new Todo on the API.
   * @param todo - The Todo to create.
   * @returns An Observable of the created Todo.
   */
  createTodo(todo: Todo) {
    return this.post<Todo>(`todos/`, todo);
  }

  /**
   * Updates an existing Todo on the API.
   * @param todo - The Todo to update.
   * @returns An Observable of the updated Todo.
   */
  editTodo(todo: Todo) {
    return this.put<Todo>(`todos/${todo.id}`, todo);
  }

  /**
   * Deletes a Todo from the API.
   * @param id - The ID of the Todo to delete.
   * @returns An Observable of an object with the deleted Todo's ID.
   */
  deleteTodo(id: string) {
    return this.delete<{ id: string }>(`todos/${id}`);
  }
}
