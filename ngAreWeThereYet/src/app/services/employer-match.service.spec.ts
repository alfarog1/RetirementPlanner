import { TestBed } from '@angular/core/testing';

import { EmployerMatchService } from './employer-match.service';

describe('EmployerMatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployerMatchService = TestBed.get(EmployerMatchService);
    expect(service).toBeTruthy();
  });
});
