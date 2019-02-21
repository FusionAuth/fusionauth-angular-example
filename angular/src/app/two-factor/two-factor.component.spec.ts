import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FusionAuthService } from '../shared/fusion-auth/fusion-auth.service';
import { TwoFactorComponent } from './two-factor.component';


describe('TwoFactorComponent', () => {
  let component: TwoFactorComponent;
  let fixture: ComponentFixture<TwoFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TwoFactorComponent,
        ErrorMessageComponent
      ],
      imports: [
        BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
        MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule,
        RouterTestingModule.withRoutes([{ path: 'login/two-factor/:id', component: TwoFactorComponent }])
      ],
      providers:    [
        { provide: FusionAuthService, useValue: null }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
