import { Component, OnInit } from '@angular/core';
import { Variant } from '../ui-elements.model';



@Component({
  selector: 'app-ui-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  buttonVariants1: Variant[] = [];
  buttonVariants2: Variant[] = [];

  constructor () { }

  ngOnInit(): void {
    this.buttonVariants1 = [
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
      },
      {
        name: 'Light',
        color: 'light'
      },
      {
        name: 'Dark',
        color: 'dark'
      },
      {
        name: 'Link',
        color: 'link'
      }
    ];

    this.buttonVariants2 = [
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
      },
      {
        name: 'Dark',
        color: 'dark'
      }
    ];
  }

}
