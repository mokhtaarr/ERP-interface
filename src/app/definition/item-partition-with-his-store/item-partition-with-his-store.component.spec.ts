import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPartitionWithHisStoreComponent } from './item-partition-with-his-store.component';

describe('ItemPartitionWithHisStoreComponent', () => {
  let component: ItemPartitionWithHisStoreComponent;
  let fixture: ComponentFixture<ItemPartitionWithHisStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPartitionWithHisStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPartitionWithHisStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
