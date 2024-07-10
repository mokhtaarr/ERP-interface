import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemCollectionsComponent } from './get-item-collections.component';

describe('GetItemCollectionsComponent', () => {
  let component: GetItemCollectionsComponent;
  let fixture: ComponentFixture<GetItemCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetItemCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetItemCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
