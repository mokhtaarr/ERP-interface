import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesEquipmentComponent } from './machines-equipment.component';

describe('MachinesEquipmentComponent', () => {
  let component: MachinesEquipmentComponent;
  let fixture: ComponentFixture<MachinesEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinesEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachinesEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
