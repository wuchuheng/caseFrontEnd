import { TestBed } from '@angular/core/testing';

import { CanActiveateLoginGuard } from './can-activeate-login.guard';

describe('CanActiveateLoginGuard', () => {
  let guard: CanActiveateLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActiveateLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
