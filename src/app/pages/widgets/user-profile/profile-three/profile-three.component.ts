import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-profile-three',
  templateUrl: './profile-three.component.html',
  styleUrls: ['./profile-three.component.scss']
})
export class ProfileThreeComponent implements OnInit {

  @Input() userName?: string;
  @Input() location?: string;
  @Input() profileImage?: string;
  @Input() about?: string;
  @Input() recentPhotos?: string[];
  @Input() followers?: number;
  @Input() noOfEvents?: number;

  constructor () { }

  ngOnInit(): void {
  }

}
