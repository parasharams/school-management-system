import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  mobileMenuOpen: boolean = false;
  @Input() loggedInUser: any = {};

  constructor () { }

  ngOnInit(): void {
    const navbar = document.getElementById("nav-menu");
    window.addEventListener('scroll', (e) => {

      e.preventDefault();
      if (navbar) {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
          navbar.classList.add("nav-sticky", "shadow");
        } else {
          navbar.classList.remove("nav-sticky", "shadow");
        }
      }

    });
  }

}
