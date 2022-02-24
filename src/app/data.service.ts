import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getListBreweriesUrl = 'https://api.openbrewerydb.org/breweries';
  constructor(private _http: HttpClient) { }

getListBreweries(){
  return this._http.get(this.getListBreweriesUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
}
private handleError(error: HttpErrorResponse) {
  if ((error.status === 500) || (error.status === 404) ) { // can check other status as well.
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
  
}
