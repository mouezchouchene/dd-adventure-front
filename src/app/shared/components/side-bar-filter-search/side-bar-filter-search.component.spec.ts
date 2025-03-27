import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFilterSearchComponent } from './side-bar-filter-search.component';

describe('SideBarFilterSearchComponent', () => {
  let component: SideBarFilterSearchComponent;
  let fixture: ComponentFixture<SideBarFilterSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarFilterSearchComponent]
    });
    fixture = TestBed.createComponent(SideBarFilterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
