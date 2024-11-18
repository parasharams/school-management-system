import { Component, OnInit } from '@angular/core';
import { Variant } from '../ui-elements.model';

@Component({
  selector: 'app-ui-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  badgeVariants: Variant[] = [];

  constructor () { }

  ngOnInit(): void {
    this.badgeVariants = [
      {
        name: 'Primary',
        color: 'primary'
      },
      {
        name: 'Secondary',
        color: 'secondary'
      },
      {
        name: 'Success',
        color: 'success'
      },
      {
        name: 'Danger',
        color: 'danger'
      },
      {
        name: 'Warning',
        color: 'warning'
      },
      {
        name: 'Info',
        color: 'info'
      }
    ];
  }

}
