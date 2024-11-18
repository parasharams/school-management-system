import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensedetailsComponent } from './expensedetails.component';

describe('ExpensedetailsComponent', () => {
  let component: ExpensedetailsComponent;
  let fixture: ComponentFixture<ExpensedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
