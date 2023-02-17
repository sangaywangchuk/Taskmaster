import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreRoutingModule } from '@app/core/core-routing.module';
import { ErrorInterceptor } from '@app/core/services/error.intercepter';
import en from '@app/src/i18n/en';
import de from '@app/src/i18n/de';
import { I18nService } from '@lib/shared';
import { LayoutsModule } from '@lib/layouts';

@NgModule({
  imports: [
    CommonModule,
    LayoutsModule,
    CoreRoutingModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot({}),
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  exports: [],
  providers: [
    ErrorInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor,
    },
  ],
})
export class CoreModule {
  constructor(private i18nServices: I18nService) {
    this.i18nServices.loadTranslations({ en, de });
  }
}
