import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock02Component } from './clock02.component';

describe('Clock02Component', () => {
  let component: Clock02Component;
  let fixture: ComponentFixture<Clock02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Clock02Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
