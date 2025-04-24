import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOrganizationComponent } from './trip-organization.component';

describe('TripOrganizationComponent', () => {
  let component: TripOrganizationComponent;
  let fixture: ComponentFixture<TripOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripOrganizationComponent]
    });
    fixture = TestBed.createComponent(TripOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
