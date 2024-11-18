import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  loggedInUser: any = {};

  constructor (
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser();
  }

  ngAfterViewInit(): void {
    document.body.classList.add("pb-0");
  }

  ngOnDestroy(): void {
    document.body.classList.remove("pb-0");
  }


}
