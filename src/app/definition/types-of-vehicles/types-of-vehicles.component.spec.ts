import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesOfVehiclesComponent } from './types-of-vehicles.component';

describe('TypesOfVehiclesComponent', () => {
  let component: TypesOfVehiclesComponent;
  let fixture: ComponentFixture<TypesOfVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesOfVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesOfVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
