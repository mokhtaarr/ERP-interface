import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesOfferItemRequestComponent } from './update-sales-offer-item-request.component';

describe('UpdateSalesOfferItemRequestComponent', () => {
  let component: UpdateSalesOfferItemRequestComponent;
  let fixture: ComponentFixture<UpdateSalesOfferItemRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalesOfferItemRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSalesOfferItemRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
