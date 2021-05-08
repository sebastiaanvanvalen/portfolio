import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clock03Component } from './clock03.component';

describe('Clock03Component', () => {
  let component: Clock03Component;
  let fixture: ComponentFixture<Clock03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Clock03Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Clock03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
