import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninandupComponent } from './signinandup.component';

describe('SigninandupComponent', () => {
  let component: SigninandupComponent;
  let fixture: ComponentFixture<SigninandupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninandupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninandupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
