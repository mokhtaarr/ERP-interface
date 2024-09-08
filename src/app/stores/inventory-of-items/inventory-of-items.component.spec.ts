import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOfItemsComponent } from './inventory-of-items.component';

describe('InventoryOfItemsComponent', () => {
  let component: InventoryOfItemsComponent;
  let fixture: ComponentFixture<InventoryOfItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryOfItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryOfItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
