import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isArray, isObject } from 'lodash-es';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (request.headers.get('X-skip-error-interceptor')) {
          return throwError(response);
        }
        let err = response.error;
        try {
          if (!(typeof err === 'string')) {
            if (isObject(err['error'])) {
              err = err['error'];
            } else if (isArray(err['error'])) {
              err = err['error'].join('\n');
            } else if (typeof err['error'] === 'string') {
              err = err['error'];
            } else {
              err = response.statusText;
            }
          }
        } catch (ex) {

          return throwError(response);
        }
        return throwError(response);
      }),
    );
  }
}
