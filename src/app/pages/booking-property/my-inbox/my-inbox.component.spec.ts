import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInboxComponent } from './my-inbox.component';

describe('MyInboxComponent', () => {
  let component: MyInboxComponent;
  let fixture: ComponentFixture<MyInboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInboxComponent]
    });
    fixture = TestBed.createComponent(MyInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
