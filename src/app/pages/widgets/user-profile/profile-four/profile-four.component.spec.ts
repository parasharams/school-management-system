import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFourComponent } from './profile-four.component';

describe('ProfileFourComponent', () => {
  let component: ProfileFourComponent;
  let fixture: ComponentFixture<ProfileFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
