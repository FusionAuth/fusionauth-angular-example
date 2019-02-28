/*
 * Copyright (c) 2018, FusionAuth, All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec } from '@angular/common/http';


class HttpSimpleEncodingCodec implements HttpParameterCodec {
  encodeKey(key: string): string { return encodeURIComponent(key); }
  encodeValue(value: string): string { return encodeURIComponent(value); }
  decodeKey(key: string): string { return decodeURIComponent(key); }
  decodeValue(value: string) { return decodeURIComponent(value); }
}

export class HttpRequestBuilder {
  private body: object;
  private headers: HttpHeaders;
  private method: string;
  private parameters: HttpParams;
  private uri: string;
  private url: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.parameters = new HttpParams({ encoder: new HttpSimpleEncodingCodec() });
  }

  /**
   * Adds a segment to the request uri
   */
  addUriSegment(segment) {
    if (typeof this.uri !== 'string') {
      this.uri = '';
    }
    if (segment !== null && typeof segment !== 'undefined') {
      if (this.uri.charAt(this.uri.length - 1) !== '/') {
        this.uri = this.uri + '/';
      }
      this.uri = this.uri + segment;
    }
    return this;
  }

  /**
   * Get the full url + uri (if it exists)
   */
  getFullUrl() {
    return this.url + (typeof this.uri === 'string' ? this.uri : '');
  }

  /**
   * Get the options object
   */
  getOptions() {
    return {
      body: this.body,
      headers: this.headers,
      observe: 'response' as 'response',
      params: this.parameters,
      reportProgress: false,
      responseType: 'json' as 'json',
      withCredentials: true
    };
  }

  /**
   * Adds a header to the request.
   *
   * @param name The name of the header.
   * @param value The value of the header.
   */
  setHeader(name, value) {
    this.headers = this.headers.set(name, value);
    return this;
  }

  /**
   * Sets the body of the client request.
   *
   * @param body The object to be written to the request body as JSON.
   */
  setJsonBody(body) {
    this.body = body;
    this.setHeader('Content-Type', 'application/json');
    // Omit the Content-Length, this is set by the browser. It is considered an un-safe header to set manually.
    return this;
  }

  /**
   * Sets the http method for the request
   */
  setMethod(method) {
    this.method = method;
    return this;
  }

  /**
   * Sets the uri of the request
   */
  setUri(uri) {
    this.uri = uri;
    return this;
  }

  /**
   * Sets the base url of the request.
   */
  setUrl(url) {
    this.url = url;
    return this;
  }

  /**
   * Adds url parameters to the request.
   *
   * @param name The name of the parameter.
   * @param value The value of the URL parameter, may be a string, object or number.
   */
  setUrlParameter(name, value) {
    if (value !== null && typeof value !== 'undefined') {
      this.parameters = this.parameters.set(name, value);
    }
    return this;
  }

  /**
   * Creates the HTTP request and returns an Observable that, when subscribed, will send the request to the server.
   */
  build() {
    return this.http.request(this.method, this.getFullUrl(), this.getOptions());
  }
}
