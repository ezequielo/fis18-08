import { TestBed } from '@angular/core/testing';

import { CreditsService } from './credit.service';

describe('CreditsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreditsService = TestBed.get(CreditsService);
    expect(service).toBeTruthy();
  });
});