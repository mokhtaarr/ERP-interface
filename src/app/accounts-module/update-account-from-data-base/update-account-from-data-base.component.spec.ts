import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountFromDataBaseComponent } from './update-account-from-data-base.component';

describe('UpdateAccountFromDataBaseComponent', () => {
  let component: UpdateAccountFromDataBaseComponent;
  let fixture: ComponentFixture<UpdateAccountFromDataBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAccountFromDataBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAccountFromDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
