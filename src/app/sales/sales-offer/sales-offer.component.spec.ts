import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOfferComponent } from './sales-offer.component';

describe('SalesOfferComponent', () => {
  let component: SalesOfferComponent;
  let fixture: ComponentFixture<SalesOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
