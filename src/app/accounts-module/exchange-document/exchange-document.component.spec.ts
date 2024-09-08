import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDocumentComponent } from './exchange-document.component';

describe('ExchangeDocumentComponent', () => {
  let component: ExchangeDocumentComponent;
  let fixture: ComponentFixture<ExchangeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
