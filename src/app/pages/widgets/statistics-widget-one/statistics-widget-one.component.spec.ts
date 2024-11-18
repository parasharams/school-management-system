import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsWidgetOneComponent } from './statistics-widget-one.component';

describe('StatisticsWidgetOneComponent', () => {
  let component: StatisticsWidgetOneComponent;
  let fixture: ComponentFixture<StatisticsWidgetOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsWidgetOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsWidgetOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
