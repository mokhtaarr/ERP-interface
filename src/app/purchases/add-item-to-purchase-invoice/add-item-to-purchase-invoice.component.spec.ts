import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToPurchaseInvoiceComponent } from './add-item-to-purchase-invoice.component';

describe('AddItemToPurchaseInvoiceComponent', () => {
  let component: AddItemToPurchaseInvoiceComponent;
  let fixture: ComponentFixture<AddItemToPurchaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemToPurchaseInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemToPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
