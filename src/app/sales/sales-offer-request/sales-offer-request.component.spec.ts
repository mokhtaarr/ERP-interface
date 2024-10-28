import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOfferRequestComponent } from './sales-offer-request.component';

describe('SalesOfferRequestComponent', () => {
  let component: SalesOfferRequestComponent;
  let fixture: ComponentFixture<SalesOfferRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOfferRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOfferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
