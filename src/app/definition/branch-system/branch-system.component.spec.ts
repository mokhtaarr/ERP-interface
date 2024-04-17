import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSystemComponent } from './branch-system.component';

describe('BranchSystemComponent', () => {
  let component: BranchSystemComponent;
  let fixture: ComponentFixture<BranchSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
