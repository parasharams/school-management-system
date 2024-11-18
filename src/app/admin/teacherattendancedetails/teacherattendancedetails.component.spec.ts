import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherattendancedetailsComponent } from './teacherattendancedetails.component';

describe('TeacherattendancedetailsComponent', () => {
  let component: TeacherattendancedetailsComponent;
  let fixture: ComponentFixture<TeacherattendancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherattendancedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherattendancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
