import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCommanderComponent } from './purchase-commander.component';

describe('PurchaseCommanderComponent', () => {
  let component: PurchaseCommanderComponent;
  let fixture: ComponentFixture<PurchaseCommanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCommanderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
