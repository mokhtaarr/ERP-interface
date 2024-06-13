import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorBranchComponent } from './add-vendor-branch.component';

describe('AddVendorBranchComponent', () => {
  let component: AddVendorBranchComponent;
  let fixture: ComponentFixture<AddVendorBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
