import { Component, OnInit } from '@angular/core';
import { Variant } from '../ui-elements.model';

@Component({
  selector: 'app-ui-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {

  dropdownVariants1: Variant[] = [];
  dropdownVariants2: Variant[] = [];


  constructor () { }

  ngOnInit(): void {
    this.dropdownVariants1 = [
      {
        name: 'Primary',
        color: 'primary',
      },
      {
        name: 'Secondary',
        color: 'secondary',
      },
      {
        name: 'Success',
        color: 'success',
      }
    ];

    this.dropdownVariants2 = [
      {
        name: 'Info',
        color: 'info',
      },
      {
        name: 'Warning',
        color: 'warning',
      },
      {
        name: 'Danger',
        color: 'danger',
      }
    ]
  }

}
