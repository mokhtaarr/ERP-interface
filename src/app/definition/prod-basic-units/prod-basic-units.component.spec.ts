import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdBasicUnitsComponent } from './prod-basic-units.component';

describe('ProdBasicUnitsComponent', () => {
  let component: ProdBasicUnitsComponent;
  let fixture: ComponentFixture<ProdBasicUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdBasicUnitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdBasicUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
