import { Todo } from '@lib/shared';
import { createAction } from '@ngrx/store';
import { FEATURE_KEY } from '../models/constants/todo.constants';
/**
 * Action to set the selected Todo id
 * @param id string id of the selected Todo 
 */
export const setSelectedTodoId = createAction(`[${FEATURE_KEY}]/get selected id` , (id: string) => ({ id }));

/**
 * Action to get all Todo entities
 */
export const getAllTodo = createAction(`[${FEATURE_KEY} API]/get todos`);

/**
 * Action to reset the Todo store
 */
export const resetStore = createAction(`${FEATURE_KEY}/reset store`);

/**
 * Action to set the search term for Todo entities
 * @param term string search term to set
 */
export const setSearchTerm = createAction(`[${FEATURE_KEY} API]/set search term`, (term: string) => ({term}));

/**
 * Action to toggle the sort order for Todo entities
 */
export const onToggleSort = createAction(`[${FEATURE_KEY}]/toggle sort`);

/**
 * Action to set all Todo entities
 * @param payload Todo[] list of Todo entities
 */
export const setAllTodo = createAction(`[${FEATURE_KEY}]/set todos`, (payload: Todo[]) => ({ payload }));

/**
 * Action to delete a Todo entity
 * @param id string id of the Todo entity to delete
 */
export const deleteTodo = createAction(`[${FEATURE_KEY} API]/delete`, (id: string) => ({ id }));
/**
 * Action to signal success in deleting a Todo entity
 * @param id string id of the deleted Todo entity 
 */
export const deletedTodo = createAction(`[${FEATURE_KEY}]/success delete`, (id: string) => ({id}))

/**
 * Action to create a new Todo entity
 * @param todo Todo Todo entity to create
 */
export const createTodo = createAction(`[${FEATURE_KEY} API]/create`, (todo: Todo) => ({ todo }));
/**
 * Action to signal success in creating a Todo entity
 * @param payload Todo created Todo entity 
 */
export const createdTodo = createAction(`[${FEATURE_KEY}]/success create todo`, (payload: Todo) => ({payload}));

/**
 * Action to edit an existing Todo entity
 * @param todo Todo Todo entity to edit
 */
export const editTodo = createAction(`[${FEATURE_KEY} API]/edit`, (todo: Todo) => ({ todo }));

/**
 * Action to signal success in editing a Todo entity
 * @param todo Todo edited Todo entity 
 */
export const editedTodo = createAction(`[${FEATURE_KEY}]/success edit`, (todo: Todo) => ({todo}));

/**
 * Action to fetch a Todo entity by id
 * @param id string id of the Todo entity to fetch
 */
export const fetchTodoById = createAction(`[${FEATURE_KEY} API]/get id`, (id: string) => ({ id }));

/**
 * Action to signal success in fetching a Todo entity by id
 * @param todo Todo fetched Todo entity 
 */
export const fetchedTodoById = createAction(`[${FEATURE_KEY}]/success get by id`, (todo: Todo) => ({todo}));

/**
 * @desc Action that sets a selected Todo attribute
 * @param attr {string} Attribute name to set
 */
export const setSelectedTodoAttr = createAction(`[${FEATURE_KEY}]/set selected attr`, (attr: string) => ({attr}));