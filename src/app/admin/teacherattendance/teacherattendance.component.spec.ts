import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherattendanceComponent } from './teacherattendance.component';

describe('TeacherattendanceComponent', () => {
  let component: TeacherattendanceComponent;
  let fixture: ComponentFixture<TeacherattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
