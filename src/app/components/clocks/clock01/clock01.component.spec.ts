import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock01Component } from './clock01.component';

describe('Clock01Component', () => {
  let component: Clock01Component;
  let fixture: ComponentFixture<Clock01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Clock01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
