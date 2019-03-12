import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularExampleService } from '../../shared/angular-example/angular-example.service';
import { ExampleComponent } from './example.component';
import { FusionAuthService } from '../../shared/fusion-auth/fusion-auth.service';


class MockAngularExampleService {
  loadExample() {
    return this;
  }

  subscribe() { }
}

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleComponent ],
      providers: [
        { provide: AngularExampleService, useValue: new MockAngularExampleService() },
        { provide: FusionAuthService, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
