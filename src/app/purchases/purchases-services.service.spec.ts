import { TestBed } from '@angular/core/testing';

import { PurchasesServicesService } from './purchases-services.service';

describe('PurchasesServicesService', () => {
  let service: PurchasesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
