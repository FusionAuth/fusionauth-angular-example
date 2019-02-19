import { HttpClient } from '@angular/common/http';
import { HttpRequestBuilder } from '../http-request-builder/http-request-builder';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {
  constructor(private http: HttpClient) { }

  getBuilder() {
    return new HttpRequestBuilder(this.http);
  }
}
