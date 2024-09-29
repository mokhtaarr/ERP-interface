import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMsPurchOrderDetailsComponent } from './update-ms-purch-order-details.component';

describe('UpdateMsPurchOrderDetailsComponent', () => {
  let component: UpdateMsPurchOrderDetailsComponent;
  let fixture: ComponentFixture<UpdateMsPurchOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMsPurchOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMsPurchOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
