import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertingStoresComponent } from './converting-stores.component';

describe('ConvertingStoresComponent', () => {
  let component: ConvertingStoresComponent;
  let fixture: ComponentFixture<ConvertingStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertingStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertingStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
