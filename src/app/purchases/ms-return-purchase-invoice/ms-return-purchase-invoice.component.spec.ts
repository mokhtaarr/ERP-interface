import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsReturnPurchaseInvoiceComponent } from './ms-return-purchase-invoice.component';

describe('MsReturnPurchaseInvoiceComponent', () => {
  let component: MsReturnPurchaseInvoiceComponent;
  let fixture: ComponentFixture<MsReturnPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsReturnPurchaseInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsReturnPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
