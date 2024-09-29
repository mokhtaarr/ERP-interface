import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseInvoiceComponent } from './update-purchase-invoice.component';

describe('UpdatePurchaseInvoiceComponent', () => {
  let component: UpdatePurchaseInvoiceComponent;
  let fixture: ComponentFixture<UpdatePurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
