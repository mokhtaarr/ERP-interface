import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSearchAccountsComponent } from './all-search-accounts.component';

describe('AllSearchAccountsComponent', () => {
  let component: AllSearchAccountsComponent;
  let fixture: ComponentFixture<AllSearchAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSearchAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSearchAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
