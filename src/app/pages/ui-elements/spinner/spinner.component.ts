import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  spinnerVariants: string[] = [];

  constructor () { }

  ngOnInit(): void {
    this.spinnerVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
  }

}
