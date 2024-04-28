import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartitionPopupComponent } from './add-partition-popup.component';

describe('AddPartitionPopupComponent', () => {
  let component: AddPartitionPopupComponent;
  let fixture: ComponentFixture<AddPartitionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartitionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartitionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
