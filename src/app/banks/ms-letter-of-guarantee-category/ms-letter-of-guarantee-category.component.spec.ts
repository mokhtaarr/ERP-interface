import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLetterOfGuaranteeCategoryComponent } from './ms-letter-of-guarantee-category.component';

describe('MsLetterOfGuaranteeCategoryComponent', () => {
  let component: MsLetterOfGuaranteeCategoryComponent;
  let fixture: ComponentFixture<MsLetterOfGuaranteeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLetterOfGuaranteeCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsLetterOfGuaranteeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
