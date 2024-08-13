import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyStoreComponent } from './supply-store.component';

describe('SupplyStoreComponent', () => {
  let component: SupplyStoreComponent;
  let fixture: ComponentFixture<SupplyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
