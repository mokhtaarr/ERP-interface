import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureAdministrativeComponent } from './structure-administrative.component';

describe('StructureAdministrativeComponent', () => {
  let component: StructureAdministrativeComponent;
  let fixture: ComponentFixture<StructureAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureAdministrativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructureAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
