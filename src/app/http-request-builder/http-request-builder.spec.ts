import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { HttpRequestBuilder } from './http-request-builder';
import { MockBuilderService } from './mock-builder.service';

describe('HttpRequestBuilder', () => {
  let builder: HttpRequestBuilder;
  let injector: TestBed;
  let service: MockBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MockBuilderService ]
    });

    injector = getTestBed();
    service = injector.get(MockBuilderService);
    builder = service.getBuilder();
  });

  it('should create an instance', () => {
    expect(builder).toBeTruthy();
  });

  it('should be safe to not set uri', () => {
    const url = builder.setUrl('http://test.com').getFullUrl();
    expect(url).toEqual('http://test.com');
  });

  it('should build a full url', () => {
    const url = builder.setUrl('http://test.com')
      .setUri('/base/uri')
      .addUriSegment('one')
      .addUriSegment('two')
      .getFullUrl();
    expect(url).toEqual('http://test.com/base/uri/one/two');
  });

  it('should have a JSON body', () => {
    const options = builder.setJsonBody({ test: 'test' }).getOptions();
    expect(JSON.stringify(options.body)).toEqual('{"test":"test"}');
    expect(options.headers.get('Content-Type')).toEqual('application/json');
  });

  it('should have parameters', () => {
    const options = builder
      .setUrlParameter('one', 'uno')
      .setUrlParameter('two', 'due')
      .getOptions();
    expect(options.params.get('one')).toEqual('uno');
    expect(options.params.toString()).toMatch('two=due');
  });
});
