import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        BrowserAnimationsModule, MatCardModule, MatIconModule, MatInputModule,
        MatFormFieldModule, FormsModule, ReactiveFormsModule
      ],
      providers:    [
        { provide: FusionAuthService, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
