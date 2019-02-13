import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';
import { StorageService } from '../storage/storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        BrowserAnimationsModule, MatCardModule, MatInputModule
      ],
      providers: [
        { provide: FusionAuthService, useValue: null }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
