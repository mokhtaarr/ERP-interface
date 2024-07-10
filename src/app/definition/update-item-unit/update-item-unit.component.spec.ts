import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemUnitComponent } from './update-item-unit.component';

describe('UpdateItemUnitComponent', () => {
  let component: UpdateItemUnitComponent;
  let fixture: ComponentFixture<UpdateItemUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
