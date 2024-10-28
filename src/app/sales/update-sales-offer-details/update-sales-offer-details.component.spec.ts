import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesOfferDetailsComponent } from './update-sales-offer-details.component';

describe('UpdateSalesOfferDetailsComponent', () => {
  let component: UpdateSalesOfferDetailsComponent;
  let fixture: ComponentFixture<UpdateSalesOfferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalesOfferDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSalesOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
