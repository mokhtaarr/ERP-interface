import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAnalyticalCodeComponent } from './sys-analytical-code.component';

describe('SysAnalyticalCodeComponent', () => {
  let component: SysAnalyticalCodeComponent;
  let fixture: ComponentFixture<SysAnalyticalCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysAnalyticalCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysAnalyticalCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
