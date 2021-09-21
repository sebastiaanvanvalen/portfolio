/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HappyBallsComponent } from './happyBalls.component';

describe('HappyBallsComponent', () => {
  let component: HappyBallsComponent;
  let fixture: ComponentFixture<HappyBallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyBallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
