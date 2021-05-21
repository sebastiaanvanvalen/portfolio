import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitconvertorComponent } from './unitconvertor.component';

describe('UnitconvertorComponent', () => {
  let component: UnitconvertorComponent;
  let fixture: ComponentFixture<UnitconvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitconvertorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitconvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
