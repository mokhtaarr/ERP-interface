import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersTypesComponent } from './suppliers-types.component';

describe('SuppliersTypesComponent', () => {
  let component: SuppliersTypesComponent;
  let fixture: ComponentFixture<SuppliersTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
