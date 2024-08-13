import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestConvertStoreComponent } from './request-convert-store.component';

describe('RequestConvertStoreComponent', () => {
  let component: RequestConvertStoreComponent;
  let fixture: ComponentFixture<RequestConvertStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestConvertStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestConvertStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
