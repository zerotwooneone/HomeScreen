import { TestBed } from '@angular/core/testing';

import { ScreenHubService } from './screen-hub.service';

describe('ScreenHubService', () => {
  let service: ScreenHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
