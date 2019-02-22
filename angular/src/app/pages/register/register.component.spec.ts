import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';
import { PasswordComponent } from '../../components/password/password.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        ErrorMessageComponent,
        PasswordComponent
      ],
      imports: [
        BrowserAnimationsModule, MatCardModule, MatIconModule, MatInputModule,
        MatFormFieldModule, FormsModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientTestingModule
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
