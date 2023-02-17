import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/reducer';
import { TodoEffects } from './state/effect';
import { I18nService } from '@lib/shared';
import en from './i18n/en';
import de from './i18n/de';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { TodoCommonService } from './services/common-service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { TodoRoutingModule } from './todo-routing.module';
import { FEATURE_KEY } from './models/constants/todo.constants';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    PushModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    TodoRoutingModule,
    EffectsModule.forFeature([TodoEffects]),
  ],
  declarations: [CreateTodoComponent, TodoListComponent],
  providers: [TodoCommonService],
})
export class TodoModule {
  constructor(private i18nServices: I18nService) {
    this.i18nServices.loadTranslations({ en, de });
  }
}
