import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementBookComponent } from './movement-book.component';

describe('MovementBookComponent', () => {
  let component: MovementBookComponent;
  let fixture: ComponentFixture<MovementBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
