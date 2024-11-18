import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsessionComponent } from './examsession.component';

describe('ExamsessionComponent', () => {
  let component: ExamsessionComponent;
  let fixture: ComponentFixture<ExamsessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
