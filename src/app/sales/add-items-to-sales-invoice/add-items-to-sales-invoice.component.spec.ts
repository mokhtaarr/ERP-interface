import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsToSalesInvoiceComponent } from './add-items-to-sales-invoice.component';

describe('AddItemsToSalesInvoiceComponent', () => {
  let component: AddItemsToSalesInvoiceComponent;
  let fixture: ComponentFixture<AddItemsToSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemsToSalesInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemsToSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
