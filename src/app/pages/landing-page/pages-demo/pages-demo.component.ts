import { Component, OnInit } from '@angular/core';


//pages demo interface
interface PageDemo {
  name: string;
  imageUrl: string;
  pageUrl: string;
}

@Component({
  selector: 'app-landing-pages-demo',
  templateUrl: './pages-demo.component.html',
  styleUrls: ['./pages-demo.component.scss']
})
export class PagesDemoComponent implements OnInit {

  pagesDemoList: PageDemo[] = [];

  constructor () { }

  ngOnInit(): void {
    this.pagesDemoList = [
      {
        name: 'Profile',
        imageUrl: 'assets/images/layouts/pages/profile-page.png',
        pageUrl: '/pages/profile'
      },
      {
        name: 'Inbox',
        imageUrl: 'assets/images/layouts/pages/inbox.png',
        pageUrl: '/apps/email/inbox'
      },
      {
        name: 'Pricing',
        imageUrl: 'assets/images/layouts/pages/pricing.png',
        pageUrl: '/pages/pricing'
      },
      {
        name: 'Invoice',
        imageUrl: 'assets/images/layouts/pages/invoice.png',
        pageUrl: '/pages/invoice'
      },
      {
        name: 'Register',
        imageUrl: 'assets/images/layouts/pages/register.png',
        pageUrl: '/auth/register'
      },
      {
        name: 'Error-404',
        imageUrl: 'assets/images/layouts/pages/error-404.png',
        pageUrl: '/error-404'
      }
    ];
  }

}
