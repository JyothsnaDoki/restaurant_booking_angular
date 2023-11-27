import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewitemsadComponent } from './viewitemsad.component';

describe('ViewitemsadComponent', () => {
  let component: ViewitemsadComponent;
  let fixture: ComponentFixture<ViewitemsadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewitemsadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewitemsadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
