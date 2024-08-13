import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLetterOfGuaranteeTypesComponent } from './ms-letter-of-guarantee-types.component';

describe('MsLetterOfGuaranteeTypesComponent', () => {
  let component: MsLetterOfGuaranteeTypesComponent;
  let fixture: ComponentFixture<MsLetterOfGuaranteeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLetterOfGuaranteeTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsLetterOfGuaranteeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
