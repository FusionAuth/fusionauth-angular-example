import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FusionAuthService } from './fusion-auth.service';


describe('FusionAuthService', () => {
  // let injector: TestBed;
  // let service: GithubApiService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FusionAuthService ]
    });
    // injector = getTestBed();
    // service = injector.get(FusionAuthService);
    // httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // httpMock.verify();
  });

  it('should be created', () => {
    const service: FusionAuthService = TestBed.get(FusionAuthService);
    expect(service).toBeTruthy();
  });
});
