import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdetailsComponent } from './markdetails.component';

describe('MarkdetailsComponent', () => {
  let component: MarkdetailsComponent;
  let fixture: ComponentFixture<MarkdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
