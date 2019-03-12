import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';


describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should set/getLoggedIn', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.setLoggedIn(true);
    expect(service.getLoggedIn()).toEqual(true);
    service.setLoggedIn(false);
    expect(service.getLoggedIn()).toEqual(false);
  });

  it('should false by default for getLoggedIn', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service.getLoggedIn()).toEqual(false);
  });
});
