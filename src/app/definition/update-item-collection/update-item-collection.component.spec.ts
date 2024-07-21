import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemCollectionComponent } from './update-item-collection.component';

describe('UpdateItemCollectionComponent', () => {
  let component: UpdateItemCollectionComponent;
  let fixture: ComponentFixture<UpdateItemCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
