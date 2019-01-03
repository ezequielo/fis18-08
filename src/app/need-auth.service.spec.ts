import { TestBed } from '@angular/core/testing';

import { NeedAuthService } from './need-auth.service';

describe('NeedAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeedAuthService = TestBed.get(NeedAuthService);
    expect(service).toBeTruthy();
  });
});
