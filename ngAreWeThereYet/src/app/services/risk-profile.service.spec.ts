import { TestBed } from '@angular/core/testing';

import { RiskProfileService } from './risk-profile.service';

describe('RiskProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskProfileService = TestBed.get(RiskProfileService);
    expect(service).toBeTruthy();
  });
});
