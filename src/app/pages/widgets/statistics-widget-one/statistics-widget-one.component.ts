import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-widget-one',
  templateUrl: './statistics-widget-one.component.html',
  styleUrls: ['./statistics-widget-one.component.scss']
})
export class StatisticsWidgetOneComponent implements OnInit {

  @Input() title?: string;
  @Input() stats?: number | string;
  @Input() icon?: string;
  @Input() variant?: string;

  constructor () { }

  ngOnInit(): void {
  }

  isNaN(number: any): boolean {
    return isNaN(number);
  }

}
