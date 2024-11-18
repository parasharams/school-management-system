import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStatisticsWidgetComponent } from './chart-statistics-widget.component';

describe('ChartStatisticsWidgetComponent', () => {
  let component: ChartStatisticsWidgetComponent;
  let fixture: ComponentFixture<ChartStatisticsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartStatisticsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStatisticsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
