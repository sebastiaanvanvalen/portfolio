/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlotsService } from './slots.service';

describe('Service: Slots', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlotsService]
    });
  });

  it('should ...', inject([SlotsService], (service: SlotsService) => {
    expect(service).toBeTruthy();
  }));
});
