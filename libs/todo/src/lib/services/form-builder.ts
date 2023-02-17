import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '@lib/shared';

/**
 * Service class to build Todo Form.
 * 
 * @export
 * @class FormBuilderService
 */
@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  /**
   * Creates an instance of FormBuilder.
   *
   * @memberof FormBuilderService
   */
  constructor(private fb: FormBuilder) {
  }

  /**
   * Method to build Todo Form.
   *
   * @param {(Todo | undefined)} data
   * @returns {FormGroup}
   */
  buildTodoForm(data?: Todo): FormGroup {
    const form = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      createdAt: [''],
      priority: ['LOW'],
      completed: ['in progress'],
    });
    if (data) {
      form.patchValue(data);
    }
    return form;
  }
}
