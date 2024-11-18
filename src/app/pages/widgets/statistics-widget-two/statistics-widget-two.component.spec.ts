import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWidgetTwoComponent } from './statistics-widget-two.component';

describe('StatisticsWidgetTwoComponent', () => {
  let component: StatisticsWidgetTwoComponent;
  let fixture: ComponentFixture<StatisticsWidgetTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsWidgetTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWidgetTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
