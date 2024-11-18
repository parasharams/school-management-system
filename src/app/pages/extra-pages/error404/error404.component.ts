import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor (private titleService: Title) {
    titleService.setTitle("Page Not Found | 404 Error Page | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template");
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
