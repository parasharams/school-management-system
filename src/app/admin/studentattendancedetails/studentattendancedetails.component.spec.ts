import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentattendancedetailsComponent } from './studentattendancedetails.component';

describe('StudentattendancedetailsComponent', () => {
  let component: StudentattendancedetailsComponent;
  let fixture: ComponentFixture<StudentattendancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentattendancedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentattendancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
