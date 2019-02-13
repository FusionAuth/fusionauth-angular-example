import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSentComponent } from './password-sent.component';

describe('PasswordSentComponent', () => {
  let component: PasswordSentComponent;
  let fixture: ComponentFixture<PasswordSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
