import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStatisticsTwoWidgetComponent } from './chart-statistics-two-widget.component';

describe('ChartStatisticsTwoWidgetComponent', () => {
  let component: ChartStatisticsTwoWidgetComponent;
  let fixture: ComponentFixture<ChartStatisticsTwoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartStatisticsTwoWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStatisticsTwoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
