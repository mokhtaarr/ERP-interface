import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBranchesComponent } from './customer-branches.component';

describe('CustomerBranchesComponent', () => {
  let component: CustomerBranchesComponent;
  let fixture: ComponentFixture<CustomerBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBranchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
