import { TestBed } from '@angular/core/testing';

import { AreWeThereYetService } from './are-we-there-yet.service';

describe('AreWeThereYetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreWeThereYetService = TestBed.get(AreWeThereYetService);
    expect(service).toBeTruthy();
  });
});
