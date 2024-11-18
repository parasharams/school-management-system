import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() title?: string;
  @Input() stats?: string | number;
  @Input() icon?: string;
  @Input() iconClass?: string;

  constructor () { }

  ngOnInit(): void {
  }

  isNaN(number: any): boolean {
    return isNaN(number);
  }

}
