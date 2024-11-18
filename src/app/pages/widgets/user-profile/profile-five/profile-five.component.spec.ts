import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFiveComponent } from './profile-five.component';

describe('ProfileFiveComponent', () => {
  let component: ProfileFiveComponent;
  let fixture: ComponentFixture<ProfileFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
