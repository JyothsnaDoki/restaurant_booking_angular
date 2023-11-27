import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookuserComponent } from './bookuser.component';

describe('BookuserComponent', () => {
  let component: BookuserComponent;
  let fixture: ComponentFixture<BookuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
