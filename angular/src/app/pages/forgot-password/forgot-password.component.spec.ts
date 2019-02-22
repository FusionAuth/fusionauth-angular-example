import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordComponent,
        ErrorMessageComponent
      ],
      imports: [
        BrowserAnimationsModule, MatCardModule, MatIconModule, MatInputModule,
        MatFormFieldModule, FormsModule, ReactiveFormsModule, RouterTestingModule
      ],
      providers:    [
        { provide: FusionAuthService, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
