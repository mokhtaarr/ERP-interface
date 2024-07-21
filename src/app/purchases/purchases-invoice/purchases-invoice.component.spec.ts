import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesInvoiceComponent } from './purchases-invoice.component';

describe('PurchasesInvoiceComponent', () => {
  let component: PurchasesInvoiceComponent;
  let fixture: ComponentFixture<PurchasesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
