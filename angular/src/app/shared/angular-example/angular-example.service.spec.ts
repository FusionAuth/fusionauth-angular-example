import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AngularExampleService } from './angular-example.service';

describe('AngularExampleService', () => {
  // let injector: TestBed;
  // let service: GithubApiService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AngularExampleService ]
    });
    // injector = getTestBed();
    // service = injector.get(AngularExampleService);
    // httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('should be created', () => {
    const service: AngularExampleService = TestBed.get(AngularExampleService);
    expect(service).toBeTruthy();
  });
});
