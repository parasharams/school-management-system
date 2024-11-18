import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsDemoComponent } from './layouts-demo.component';

describe('LayoutsDemoComponent', () => {
  let component: LayoutsDemoComponent;
  let fixture: ComponentFixture<LayoutsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
