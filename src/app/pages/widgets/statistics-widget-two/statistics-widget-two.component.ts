import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-widget-two',
  templateUrl: './statistics-widget-two.component.html',
  styleUrls: ['./statistics-widget-two.component.scss']
})
export class StatisticsWidgetTwoComponent implements OnInit {

  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() stats?: number | string;
  @Input() progress?: number;
  @Input() variant?: string;

  constructor () { }

  ngOnInit(): void {
  }

  isNaN(number: any): boolean {
    return isNaN(number);
  }

}
