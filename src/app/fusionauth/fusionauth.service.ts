import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'ComPtkb4XvvaBADR98LtN1a1Tuf6jP3zmBXeKSGOr4s'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FusionAuthService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://fusionauth.local:9011';
    // inject apiKey? and add to httpOptions?
  }

  login(request) {
    return this.post('/api/login', request);
  }

  private post(uri, request) {
    const url = this.baseUrl + uri;
    // TODO: add extra options to httpOptions?
    // TODO: add intercepter(s)?
    return this.http.post(url, request, {...httpOptions, observe: 'response'});
      // .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
  }
}
