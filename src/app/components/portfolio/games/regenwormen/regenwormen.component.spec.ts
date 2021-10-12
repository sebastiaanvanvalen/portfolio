/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegenwormenComponent } from './regenwormen.component';

describe('RegenwormenComponent', () => {
  let component: RegenwormenComponent;
  let fixture: ComponentFixture<RegenwormenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegenwormenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegenwormenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
