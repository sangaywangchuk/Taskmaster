import { Todo } from '@lib/shared';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';



/**
 * The shape of the state for this feature
 */
export interface TodoState extends EntityState<Todo> {
  /**
   * The ID of the selected todo
   */
  selectedTodoId: string | undefined;
  /**
   * Whether the todo list should be sorted in ascending order
   */
  sortAscending: boolean;
  /**
   * The selected attribute of a to-do to sort the list by
   */
  selectedTodoAttribute: string;
  /**
   * The search term used to filter the list of to-dos
   */
  searchTerm: string | undefined;
  /**
   * The selected todo
   */
  selectedTodo: Todo | undefined;
}

/**
 * The entity adapter for todos
 */
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  /**
   * The function to extract the ID from a todo
   */
  selectId: (todo) => todo.id,
  /**
   * The compare function to sort the todos
   */
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

/**
 * The initial state of the todo feature
 */
export const initialTodoState: TodoState = adapter.getInitialState({
  selectedTodoId: undefined,
  sortAscending: false,
  selectedTodoAttribute: 'title',
  searchTerm: undefined,
  selectedTodo: undefined,
});

/**
 * The reducer function for the todo feature
 */
export const reducer = createReducer(
  initialTodoState,
   /**
   * Sets the selectedTodoId in the Todo state.
   * @param state The current Todo state.
   * @param id The id of the selected Todo.
   */
  on(actions.setSelectedTodoId, (state, { id }) => ({ ...state, selectedTodoId: id })),
    /**
   * Sets the search term in the Todo state.
   * @param state The current Todo state.
   * @param term The search term.
   */
  on(actions.setSearchTerm, (state, { term }) => ({...state, searchTerm: term})),
    /**
   * Sets the selected Todo in the Todo state.
   * @param state The current Todo state.
   * @param todo The selected Todo.
   */
  on(actions.fetchedTodoById, (state, { todo}) => ({ ...state, selectedTodo: todo })),
  /**
   * Toggles the sortAscending flag in the Todo state.
   * @param state The current Todo state.
   */
  on(actions.onToggleSort, (state) =>({...state, sortAscending: !state.sortAscending})),
   /**
   * Sets the Todos in the Todo state.
   * @param state The current Todo state.
   * @param payload An array of Todos.
   */
  on(actions.setAllTodo, (state, { payload }) => adapter.setAll(payload, state)),
    /**
   * Removes a Todo from the Todo state.
   * @param state The current Todo state.
   * @param id The id of the Todo to remove.
   */
  on(actions.deletedTodo, (state, { id }) => adapter.removeOne(id, state)),
    /**
   * Adds a Todo to the Todo state.
   * @param state The current Todo state.
   * @param payload The Todo to add.
   */
  on(actions.createdTodo, (state, { payload }) => adapter.addOne(payload, state)),
  /**
   * Sets the selected Todo attribute in the Todo state.
   * @param state The current Todo state.
   * @param attr The selected Todo attribute.
   */
  on(actions.setSelectedTodoAttr, (state, { attr }) =>  ({...state, selectedTodoAttribute: attr})),
  /**
   * Update a todo item in the state
   * 
   * @param {Object} state - The current state of the Redux store
   * @param {Object} { todo } - An object containing the updated todo item
   * @returns {Object} - The updated state of the Redux store
   */
  on(actions.editedTodo, (state, { todo }) => adapter.updateOne({ id: todo.id, changes: todo}, state)),
  /**
 * Resets the state of the todo store to the `initialTodoState`.
 */
  on(actions.resetStore, () => initialTodoState),
);
