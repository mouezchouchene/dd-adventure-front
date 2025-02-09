import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListingComponent } from './add-listing.component';

describe('AddListingComponent', () => {
  let component: AddListingComponent;
  let fixture: ComponentFixture<AddListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddListingComponent]
    });
    fixture = TestBed.createComponent(AddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
