import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemCollectionFromDataBaseComponent } from './update-item-collection-from-data-base.component';

describe('UpdateItemCollectionFromDataBaseComponent', () => {
  let component: UpdateItemCollectionFromDataBaseComponent;
  let fixture: ComponentFixture<UpdateItemCollectionFromDataBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemCollectionFromDataBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemCollectionFromDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
