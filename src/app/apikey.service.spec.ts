import { TestBed } from '@angular/core/testing';

import { ApikeyService } from './apikey.service';

describe('ApikeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApikeyService = TestBed.get(ApikeyService);
    expect(service).toBeTruthy();
  });
});
