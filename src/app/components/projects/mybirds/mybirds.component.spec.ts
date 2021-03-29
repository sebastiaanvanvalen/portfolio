import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybirdsComponent } from './mybirds.component';

describe('MybirdsComponent', () => {
  let component: MybirdsComponent;
  let fixture: ComponentFixture<MybirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybirdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
