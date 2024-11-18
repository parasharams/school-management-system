import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniconIconsComponent } from './unicon-icons.component';

describe('UniconIconsComponent', () => {
  let component: UniconIconsComponent;
  let fixture: ComponentFixture<UniconIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniconIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniconIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
