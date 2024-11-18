import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassfeesComponent } from './classfees.component';

describe('ClassfeesComponent', () => {
  let component: ClassfeesComponent;
  let fixture: ComponentFixture<ClassfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassfeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
