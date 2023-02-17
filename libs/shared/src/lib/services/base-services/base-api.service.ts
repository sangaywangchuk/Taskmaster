import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * The `BaseApiService` provides a base class for making HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  /**
   * A static reference to the `HttpClient` instance.
   */
  static http: HttpClient;

  /**
   * The base URL for the API.
   */
  protected baseUrl = 'https://api.example.com/';

  /**
   * The default options for HTTP requests.
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Creates an instance of `BaseApiService`.
   *
   * @param {HttpClient} http The `HttpClient` instance to use for making requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Handles an error that occurred during an HTTP request.
   *
   * @param {HttpErrorResponse} error The error that occurred.
   * @returns {Observable<never>} An observable that emits an error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Perform a GET request to the given URL and retry up to 'retries' times on failure.
   * @param {string} url - The URL to make the request to.
   * @param {number} [retries=2] - The number of times to retry on failure.
   * @returns {Observable<T>} - The data returned from the request.
   */
  protected get<T>(url: string = '', retries = 2): Observable<T> {
    return this.http
      .get<T>(this.baseUrl + url)
      .pipe(retry(retries), catchError(this.handleError));
  }

  /**
   * Perform a POST request to the given URL with the provided data and retry up to 'retries' times on failure.
   * @param {string} url - The URL to make the request to.
   * @param {*} data - The data to send with the request.
   * @param {number} [retries=2] - The number of times to retry on failure.
   * @returns {Observable<T>} - The data returned from the request.
   */
  protected post<T>(url: string, data: any, retries = 2): Observable<T> {
    return this.http
      .post<T>(this.baseUrl + url, data, this.httpOptions)
      .pipe(retry(retries), catchError(this.handleError));
  }

  /**
   * Perform a PUT request to the given URL with the provided data and retry up to 'retries' times on failure.
   * @param {string} url - The URL to make the request to.
   * @param {*} data - The data to send with the request.
   * @param {number} [retries=2] - The number of times to retry on failure.
   * @returns {Observable<T>} - The data returned from the request.
   */
  protected put<T>(url: string, data: any, retries = 2): Observable<T> {
    return this.http
      .put<T>(this.baseUrl + url, data, this.httpOptions)
      .pipe(retry(retries), catchError(this.handleError));
  }

  /**
   * Perform a DELETE request to the given URL and retry up to 'retries' times on failure.
   * @param {string} url - The URL to make the request to.
   * @param {number} [retries=2] - The number of times to retry on failure.
   * @returns {Observable<T>} - The data returned from the request.
   */
  protected delete<T>(url: string, retries = 2): Observable<T> {
    return this.http
      .delete<T>(this.baseUrl + url)
      .pipe(retry(retries), catchError(this.handleError));
  }
}
