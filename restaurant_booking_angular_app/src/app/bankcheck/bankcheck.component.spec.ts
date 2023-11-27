import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcheckComponent } from './bankcheck.component';

describe('BankcheckComponent', () => {
  let component: BankcheckComponent;
  let fixture: ComponentFixture<BankcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankcheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
