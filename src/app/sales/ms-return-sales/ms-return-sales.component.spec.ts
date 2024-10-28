import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsReturnSalesComponent } from './ms-return-sales.component';

describe('MsReturnSalesComponent', () => {
  let component: MsReturnSalesComponent;
  let fixture: ComponentFixture<MsReturnSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsReturnSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsReturnSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
