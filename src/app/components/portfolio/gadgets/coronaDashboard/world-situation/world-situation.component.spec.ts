/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorldSituationComponent } from './world-situation.component';

describe('WorldSituationComponent', () => {
  let component: WorldSituationComponent;
  let fixture: ComponentFixture<WorldSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
