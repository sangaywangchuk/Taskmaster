import { MemoizedSelector, select, Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

/**
 * BaseStoreService provides common methods for accessing the NGRX store and a form builder service.
 */
export class BaseStoreService<T> {
  
  constructor(private store: Store<T>) {
  }
  /**
   * Returns an observable that emits the current value of the selected state in the NGRX store.
   * @param selector The selector used to select the state.
   */
  selectState<U>(selector: MemoizedSelector<T, U>): Observable<U> {
    return this.store.pipe(select(selector));
  }

  /**
   * Dispatches an action to the NGRX store.
   * @param action The action to dispatch.
   */
  dispatchAction(action: Action): void {
    this.store.dispatch(action);
  }
}
