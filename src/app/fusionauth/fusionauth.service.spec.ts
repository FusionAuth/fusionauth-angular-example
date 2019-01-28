import { TestBed } from '@angular/core/testing';

import { FusionauthService } from './fusionauth.service';

describe('FusionauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FusionauthService = TestBed.get(FusionauthService);
    expect(service).toBeTruthy();
  });
});
