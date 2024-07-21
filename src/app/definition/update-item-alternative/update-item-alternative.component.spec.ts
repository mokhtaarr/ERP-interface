import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemAlternativeComponent } from './update-item-alternative.component';

describe('UpdateItemAlternativeComponent', () => {
  let component: UpdateItemAlternativeComponent;
  let fixture: ComponentFixture<UpdateItemAlternativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemAlternativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
