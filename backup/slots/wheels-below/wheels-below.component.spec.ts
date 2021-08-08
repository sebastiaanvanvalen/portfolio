/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WheelsBelowComponent } from './wheels-below.component';

describe('WheelsBelowComponent', () => {
  let component: WheelsBelowComponent;
  let fixture: ComponentFixture<WheelsBelowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheelsBelowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelsBelowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
