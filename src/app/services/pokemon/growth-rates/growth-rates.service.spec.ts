import { TestBed } from '@angular/core/testing';
import { GrowthRatesService } from './growth-rates.service';

describe('GrowthRatesService', () => {
  let service: GrowthRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrowthRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
