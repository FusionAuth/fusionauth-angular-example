import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FusionAuthService } from '../shared/fusion-auth/fusion-auth.service';
import { VerifyEmailComponent } from './verify-email.component';

class MockFusionAuthService {
  verifyRegistration(verificationId) {
    return this;
  }

  subscribe() { }
}

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VerifyEmailComponent,
        ErrorMessageComponent
      ],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'email/verify/:id', component: VerifyEmailComponent }])
      ],
      providers:    [
        { provide: FusionAuthService, useValue: new MockFusionAuthService() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
