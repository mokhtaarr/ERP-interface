import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCompanyComponent } from './branch-company.component';

describe('BranchCompanyComponent', () => {
  let component: BranchCompanyComponent;
  let fixture: ComponentFixture<BranchCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
