import { TestBed } from '@angular/core/testing';

import { SystemToolsService } from './system-tools.service';

describe('SystemToolsService', () => {
  let service: SystemToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
