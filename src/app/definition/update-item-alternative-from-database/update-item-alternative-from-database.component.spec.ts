import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemAlternativeFromDatabaseComponent } from './update-item-alternative-from-database.component';

describe('UpdateItemAlternativeFromDatabaseComponent', () => {
  let component: UpdateItemAlternativeFromDatabaseComponent;
  let fixture: ComponentFixture<UpdateItemAlternativeFromDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemAlternativeFromDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemAlternativeFromDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
