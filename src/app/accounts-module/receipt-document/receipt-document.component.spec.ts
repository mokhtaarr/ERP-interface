import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDocumentComponent } from './receipt-document.component';

describe('ReceiptDocumentComponent', () => {
  let component: ReceiptDocumentComponent;
  let fixture: ComponentFixture<ReceiptDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
