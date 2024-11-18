import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component implements OnInit {

  constructor (private titleService: Title) {
    titleService.setTitle("500 Error | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('authentication-bg');
  }

}
