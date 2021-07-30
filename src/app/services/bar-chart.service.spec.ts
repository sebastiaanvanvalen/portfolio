/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarChartService } from './bar-chart.service';

describe('Service: BarChart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarChartService]
    });
  });

  it('should ...', inject([BarChartService], (service: BarChartService) => {
    expect(service).toBeTruthy();
  }));
});
