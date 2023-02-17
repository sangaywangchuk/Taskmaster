import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Todo } from '@lib/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, Observable, tap } from 'rxjs';
import { CATEGORY, SORT_CATEGORY, TODO_FILTER_KEYS } from '../../models/constants/todo.constants';
import { TodoCommonService } from '../../services/common-service';
/**
 * A component that displays a list of todos
 */
@UntilDestroy()
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  private hasLoaded = false;

  /**
   * The observable that emits the todo list
   */
  todoList$?: Observable<Todo[]>;

  isAscending$?: Observable<boolean>;

  /**
   * The form control that holds the search term
   */
  searchTerm: FormControl = new FormControl(undefined);

  /**
   * The form control that holds the filter option
   */
  filterMenu: FormControl = new FormControl('title');

  /**
   * The form control that holds the sort option
   */
  sortMenuControl: FormControl = new FormControl('title');

  /**
   * The form control that holds the category filter option
   */
  categoryForm: FormControl = new FormControl('completed');

  /**
   * The list of todo Attributes keys for filtering
   */
  todoKeys = TODO_FILTER_KEYS;

  /**
   * The category object that holds different Todo Attributes options
   */
  category: Category = CATEGORY;

  sortCategory = SORT_CATEGORY;

  /**
   * The constructor of the TodoListComponent class
   * @param facade The facade service for todos
   * @param router The Angular router
   * @param route The activated route
   */
  constructor(
    private service: TodoCommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.initializer();
  }

  /**
   * Initializes the todo list component by subscribing to the todo list,
   * setting up event listeners for search term, category, and filter menu changes,
   * and calling the `getAllTodo` method of the facade if no todos are found.
   */
  initializer(): void {
    this.isAscending$ = this.service.selectSortAscending$;
    this.service.todoList$
      .pipe(untilDestroyed(this))
      .subscribe((res: Todo[]) => {
        if (res?.length) {
          this.todoList$ = this.service.todoList$;
        } else if (!this.hasLoaded) {
          this.service.getAllTodo();
        }
      });
    this.onSearchTerm();
    this.onSelectCategory();
    this.onSelectFilterMenu();
    this.onSelectSortMenu();
  }

  /**
   * Returns the category array based on the selected filter option
   */
  get categoryArray(): string[] {
    return this.category[this.filterMenu.value];
  }

  /**
   * Subscribes to changes in the search term and updates the list of todos
   * Debounces the subscription with a delay of 500 milliseconds.
   */
  onSearchTerm(): void {
    this.searchTerm.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        tap((res) => this.service.setSearchTerm(res)),
      )
      .subscribe(() => {
        this.todoList$ = this.service.selectGlobalSearchTodo$;
      });
  }

  /**
   * Subscribes to changes in the selected category and updates the list of todos
   */
  onSelectCategory(): void {
    this.categoryForm.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((res) => this.service.setSearchTerm(res)),
      )
      .subscribe(() => {
        this.service.setSelectedTodoAttr(this.filterMenu.value);
        this.todoList$ = this.service.selectFilteredTodoList$;
      });
  }

  /**
   * Subscribes to the filter menu value changes and updates the todo list.
   * Debounces the subscription with a delay of 500 milliseconds.
   */
  onSelectFilterMenu(): void {
    this.filterMenu.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      this.todoList$ = this.service.todoList$;
    });
  }

  /**
   * Subscribes to the sort menu value changes and updates the todo list.
   */
  onSelectSortMenu(): void {
    this.sortMenuControl.valueChanges
      .pipe(
        untilDestroyed(this),
        tap((res) => this.service.setSelectedTodoAttr(res)),
      )
      .subscribe(() => {
        this.todoList$ = this.service.todoList$;
      });
  }

  /**
   * Deletes a todo with the specified id by calling the `deleteTodo` method of the facade.
   * @param {string} id - The id of the todo to be deleted.
   */
  onDelete(id: string): void {
    this.service.deleteTodo(id);
  }

  /**
   * Navigates to the edit page with the specified id by calling the `navigate` method of the router.
   * @param {string} id - The id of the todo to be edited.
   */
  onEdit(id: string): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  /**
   * Navigates to the create page by calling the `navigate` method of the router.
   */
  onCreateTodo(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  /**
   * Toggles the sorting of the todo list by calling the `onToggleSort` method of the facade,
   * and updates the sorted todo list.
   */
  onSortData(): void {
    this.service.onToggleSort();
    this.todoList$ = this.service.selectSortedTodoList$;
  }
}
