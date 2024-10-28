import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMsReturnPurchaseItemsComponent } from './update-ms-return-purchase-items.component';

describe('UpdateMsReturnPurchaseItemsComponent', () => {
  let component: UpdateMsReturnPurchaseItemsComponent;
  let fixture: ComponentFixture<UpdateMsReturnPurchaseItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMsReturnPurchaseItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMsReturnPurchaseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
