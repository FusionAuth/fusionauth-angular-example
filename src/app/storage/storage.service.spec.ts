import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({})
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should remove item if value is null', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.setAccessToken('TokenValue');
    expect(service.getAccessToken()).toEqual('TokenValue');
    service.setAccessToken(null);
    expect(service.getAccessToken()).toEqual(null);
  });
});
