import { TestBed } from '@angular/core/testing';

import { ScreenBreakPointService } from './screen-break-point.service';

describe('ScreenBreakPointService', () => {
  let service: ScreenBreakPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenBreakPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
