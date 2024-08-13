import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreExchangeComponent } from './store-exchange.component';

describe('StoreExchangeComponent', () => {
  let component: StoreExchangeComponent;
  let fixture: ComponentFixture<StoreExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreExchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
