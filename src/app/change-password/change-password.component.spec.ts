import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { PasswordComponent } from '../password/password.component';
import { FusionAuthService } from '../fusion-auth/fusion-auth.service';


describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangePasswordComponent,
        ErrorMessageComponent,
        PasswordComponent
      ],
      imports: [
        BrowserAnimationsModule, MatCardModule, MatIconModule, MatInputModule,
        MatFormFieldModule, FormsModule, ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'password/change/:id', component: ChangePasswordComponent }])
      ],
      providers:    [
        { provide: FusionAuthService, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
