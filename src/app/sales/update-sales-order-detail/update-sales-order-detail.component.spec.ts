import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesOrderDetailComponent } from './update-sales-order-detail.component';

describe('UpdateSalesOrderDetailComponent', () => {
  let component: UpdateSalesOrderDetailComponent;
  let fixture: ComponentFixture<UpdateSalesOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSalesOrderDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSalesOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
