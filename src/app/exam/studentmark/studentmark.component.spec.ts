import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmarkComponent } from './studentmark.component';

describe('StudentmarkComponent', () => {
  let component: StudentmarkComponent;
  let fixture: ComponentFixture<StudentmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
