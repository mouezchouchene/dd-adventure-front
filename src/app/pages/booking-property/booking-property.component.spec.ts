import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPropertyComponent } from './booking-property.component';

describe('BookingPropertyComponent', () => {
  let component: BookingPropertyComponent;
  let fixture: ComponentFixture<BookingPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingPropertyComponent]
    });
    fixture = TestBed.createComponent(BookingPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
