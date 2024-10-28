import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesInvoiceDetailsComponent } from './update-sales-invoice-details.component';

describe('UpdateSalesInvoiceDetailsComponent', () => {
  let component: UpdateSalesInvoiceDetailsComponent;
  let fixture: ComponentFixture<UpdateSalesInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalesInvoiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSalesInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
