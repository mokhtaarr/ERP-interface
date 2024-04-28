import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionPopupComponent } from './partition-popup.component';

describe('PartitionPopupComponent', () => {
  let component: PartitionPopupComponent;
  let fixture: ComponentFixture<PartitionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartitionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartitionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
