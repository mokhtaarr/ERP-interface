import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleShapesComponent } from './vehicle-shapes.component';

describe('VehicleShapesComponent', () => {
  let component: VehicleShapesComponent;
  let fixture: ComponentFixture<VehicleShapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleShapesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
