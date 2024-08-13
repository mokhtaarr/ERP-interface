import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLetterOfGuaranteeStatusComponent } from './ms-letter-of-guarantee-status.component';

describe('MsLetterOfGuaranteeStatusComponent', () => {
  let component: MsLetterOfGuaranteeStatusComponent;
  let fixture: ComponentFixture<MsLetterOfGuaranteeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLetterOfGuaranteeStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsLetterOfGuaranteeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
