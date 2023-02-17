import { Todo } from '@lib/shared';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY } from '../models/constants/todo.constants';
import { adapter, TodoState } from './reducer';

/**
 * Selects the todo state from the store.
 */
const selectTodoState = createFeatureSelector<TodoState>(FEATURE_KEY);

/**
 * Gets the selectors from the adapter.
 */
const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

/**
 * Selects all todos from the store.
 */
export const selectAllTodo = createSelector(selectTodoState, selectAll);

/**
 * Selects the entities of todos from the store.
 */
export const selectTodoEntities = createSelector( selectTodoState, selectEntities );

/**
 * Selects the ids of todos from the store.
 */
export const selectTodoIds = createSelector(selectTodoState, selectIds);

/**
 * Selects the total number of todos from the store.
 */
export const selectTodoTotal = createSelector(selectTodoState, selectTotal);

/**
 * Selects the sort order of todos from the store.
 */
export const selectSortAscending = createSelector(
  selectTodoState,
  (state) => state.sortAscending,
);

/**
 * Selects the selected attribute of a todo from the store.
 */
export const selectTodoAttribute = createSelector(
  selectTodoState,
  (state) => state.selectedTodoAttribute,
);

/**
 * Selects the currently selected todo from the store.
 */
export const selectedTodo = createSelector(
  selectTodoState,
  (state) => state.selectedTodo,
);

/**
 * Selects the search term for todos from the store.
 */
export const selectSearchTerm = createSelector(
  selectTodoState,
  (state) => state.searchTerm,
);

/**
 * Selects the sorted todos based on the sort CreateAt.
 */
export const selectTodoSortedCreateAt = createSelector(
  selectAllTodo,
  selectSortAscending,
  (todoList, sortAscending) => {
    return sortAscending
      ? [...todoList].sort(
          (firstTodo: Todo, secondTodo: Todo) => 
            new Date(firstTodo.createdAt).getTime() - new Date(secondTodo.createdAt).getTime()
        )
      : [...todoList].sort(
          (firstTodo: Todo, secondTodo: Todo) =>
            new Date(secondTodo.createdAt).getTime() - new Date(firstTodo.createdAt).getTime(),
        );
  },
);

/**
 * Selects the sorted todos based on the sort Todo attributes.
 */
export const selectAllTodoSorted = createSelector(
  selectAllTodo,
  selectSortAscending,
  selectTodoAttribute,
  selectTodoSortedCreateAt,
  (todoList, sortAscending, selectedAttribute: string, selectSortedCreateAt) => {
    if (selectedAttribute === 'createAt') {
      return selectSortedCreateAt;
    } else {
      const sortFn = sortAscending
        ? (firstTodo: Todo, secondTodo: Todo) =>
            firstTodo[selectedAttribute] < secondTodo[selectedAttribute] ? -1 : 1
        : (firstTodo: Todo, secondTodo: Todo) =>
            secondTodo[selectedAttribute] < firstTodo[selectedAttribute] ? -1 : 1;
      return [...todoList].sort(sortFn);
    }
  },
);

/**
 * Selects the todos based on the search term and selected attribute.
 */
export const selectTodoBySearchTerm = createSelector(
  selectAllTodo,
  selectSearchTerm,
  selectTodoAttribute,
  (
    todoList: Todo[],
    searchTerm: string | undefined,
    selectedAttribute: string,
  ) => {
    return [...todoList].filter((todo: Todo) =>
      searchTerm
        ? todo[selectedAttribute].toString()
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
        : [...todoList],
    );
  },
);

/**
 * This selector creates a filtered list of todos based on the global search term.
 * It returns all todos if the search term is not provided.
 */
export const selectGlobalSearchTodo = createSelector(
  selectAllTodo,
  selectSearchTerm,
  (todoList: Todo[], searchTerm: string | undefined) => {
    return [...todoList].filter((todo: Todo) =>
      searchTerm
        ? JSON.stringify(Object.values(todo))
            .toLowerCase()
            .indexOf(searchTerm.toLowerCase()) !== -1
        : [...todoList],
    );
  },
);
