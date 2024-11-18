import { Component, OnInit } from '@angular/core';
import { LayoutEventType } from 'src/app/core/constants/events';
import { EventService } from 'src/app/core/service/event.service';
import { LAYOUT_HORIZONTAL, LAYOUT_VERTICAL, LAYOUT_WIDTH_BOXED, LEFT_SIDEBAR_THEME_DARK, LEFT_SIDEBAR_TYPE_CONDENSED } from 'src/app/layout/shared/config/layout.model';

//layout interface
interface Layout {
  name: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-landing-layouts-demo',
  templateUrl: './layouts-demo.component.html',
  styleUrls: ['./layouts-demo.component.scss']
})
export class LayoutsDemoComponent implements OnInit {

  layoutList: Layout[] = [];

  constructor (private eventService: EventService) {

  }

  ngOnInit(): void {
    this.layoutList = [
      {
        name: 'Vertical Layout',
        imageUrl: 'assets/images/layouts/vertical-landing.png',
        link: '../dashboard/ecommerce'
      },
      {
        name: 'Horizontal Layout',
        imageUrl: 'assets/images/layouts/horizontal-landing.png',
        link: '../dashboard/ecommerce'
      },
      {
        name: 'Dark Layout',
        imageUrl: 'assets/images/layouts/dark-landing.png',
        link: 'http://shreyu-ng-dark.coderthemes.com/auth/login/'
      },
      {
        name: 'Semi Dark Layout',
        imageUrl: 'assets/images/layouts/vertical-dark-sidebar-landing.png',
        link: '../dashboard/ecommerce'
      },
      {
        name: 'Fixed Width(Boxed) Layout',
        imageUrl: 'assets/images/layouts/boxed-landing.png',
        link: '../dashboard/ecommerce'
      },
      {
        name: 'Condensed Sidenav Layout',
        imageUrl: 'assets/images/layouts/vertical-condensed-landing.png',
        link: '../dashboard/ecommerce'
      }
    ];
  }

  /**
   * change layout based configurations
   */
  changedLayoutConfig(layout: string): void {

    switch (layout) {
      case 'Vertical Layout':
        sessionStorage.setItem("Layout_Type", LAYOUT_VERTICAL);
        return;
      case 'Horizontal Layout':
        sessionStorage.setItem("Layout_Type", LAYOUT_HORIZONTAL);
        return;
      case 'Semi Dark Layout':
        sessionStorage.setItem("Layout_Type", LAYOUT_VERTICAL);
        sessionStorage.setItem("Leftsidebar_Theme", LEFT_SIDEBAR_THEME_DARK);
        return;
      case 'Fixed Width(Boxed) Layout':
        sessionStorage.setItem("Layout_Type", LAYOUT_VERTICAL);
        sessionStorage.setItem("Layout_Width", LAYOUT_WIDTH_BOXED);
        sessionStorage.setItem("Leftsidebar_Type", LEFT_SIDEBAR_TYPE_CONDENSED);
        return;
      case 'Condensed Sidenav Layout':
        sessionStorage.setItem("Layout_Type", LAYOUT_VERTICAL);
        sessionStorage.setItem("Leftsidebar_Type", LEFT_SIDEBAR_TYPE_CONDENSED);
        return;
      default:
        return;
    }
  }

}
