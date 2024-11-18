import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-profile-five',
  templateUrl: './profile-five.component.html',
  styleUrls: ['./profile-five.component.scss']
})
export class ProfileFiveComponent implements OnInit {

  @Input() userName?: string;
  @Input() designation?: string;
  @Input() profileImage?: string;
  @Input() accontId?: string;
  @Input() followers?: string;
  @Input() views?: string;
  @Input() posts?: string;

  constructor () { }

  ngOnInit(): void {
  }

}
