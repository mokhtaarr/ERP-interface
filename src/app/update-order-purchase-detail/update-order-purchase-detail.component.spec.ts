import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderPurchaseDetailComponent } from './update-order-purchase-detail.component';

describe('UpdateOrderPurchaseDetailComponent', () => {
  let component: UpdateOrderPurchaseDetailComponent;
  let fixture: ComponentFixture<UpdateOrderPurchaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderPurchaseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOrderPurchaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
