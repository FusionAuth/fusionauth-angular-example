import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { ChangePasswordComponent } from './change-password.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { PasswordComponent } from '../../components/password/password.component';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


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
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key) => 'id',
                has: (key) => true
              },
              url: ['password', 'change', 'token']
            }
          }
        },
        { provide: FusionAuthService, useValue: null },
        { provide: AngularExampleService, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // const route = TestBed.get(ActivatedRoute);
    // route.url.value[0].path = '/password/change/token';
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
