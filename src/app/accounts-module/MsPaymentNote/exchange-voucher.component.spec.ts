import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeVoucherComponent } from './exchange-voucher.component';

describe('ExchangeVoucherComponent', () => {
  let component: ExchangeVoucherComponent;
  let fixture: ComponentFixture<ExchangeVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
