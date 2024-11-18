import { TestBed } from '@angular/core/testing';

import { TeachersubjectService } from './teachersubject.service';

describe('TeachersubjectService', () => {
  let service: TeachersubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachersubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
