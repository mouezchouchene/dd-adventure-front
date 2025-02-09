import { TestBed } from '@angular/core/testing';

import { PropertiesListingsService } from './properties-listings.service';

describe('PropertiesListingsService', () => {
  let service: PropertiesListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
