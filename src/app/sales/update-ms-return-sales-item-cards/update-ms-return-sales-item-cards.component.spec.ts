import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMsReturnSalesItemCardsComponent } from './update-ms-return-sales-item-cards.component';

describe('UpdateMsReturnSalesItemCardsComponent', () => {
  let component: UpdateMsReturnSalesItemCardsComponent;
  let fixture: ComponentFixture<UpdateMsReturnSalesItemCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMsReturnSalesItemCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMsReturnSalesItemCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
