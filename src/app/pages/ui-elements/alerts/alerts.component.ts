import { Component, OnInit } from '@angular/core';
import { Variant } from '../ui-elements.model';

@Component({
  selector: 'app-ui-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertVariants1: Variant[] = [];
  alertVariants2: Variant[] = [];

  constructor () { }

  ngOnInit(): void {
    this.alertVariants1 = [
      {
        name: 'primary',
        color: 'primary'
      },
      {
        name: 'secondary',
        color: 'secondary'
      },
      {
        name: 'success',
        color: 'success'
      }
    ];

    this.alertVariants2 = [
      {
        name: 'danger',
        color: 'danger'
      },
      {
        name: 'warning',
        color: 'warning'
      },
      {
        name: 'info',
        color: 'info'
      }
    ];
  }

  /**
  * closes alert
  * @param alert alert
*/
  closeAlert(alert: Variant): void {
    this.alertVariants2.splice(this.alertVariants2.indexOf(alert), 1);
  }

}
