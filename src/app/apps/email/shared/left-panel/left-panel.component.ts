import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { EMAILLABELS, EMAILMENULINKS } from '../data';
import { EmailChatUser, EmailLabel, EmailMenuLinkItem } from '../email.model';

@Component({
  selector: 'app-email-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  @Input() showChat: boolean = false;
  @Input() containerClass: string = '';

  emailLabels: EmailLabel[] = [];
  emailMenuLinks: EmailMenuLinkItem[] = [];
  showChatbox: boolean = false;
  chatUser!: EmailChatUser;

  loggedInUser: any = {};

  constructor (private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser();

    this.emailMenuLinks = EMAILMENULINKS;

    this.emailLabels = EMAILLABELS;

    this.chatUser = {
      name: 'Johnny',
      avatar: 'assets/images/users/avatar-2.jpg'
    }

    if (this.showChat) {
      this.showChatWindow();
    }

  }

  /**
   * Shows chat window
   */
  showChatWindow(name?: string, avatar?: string) {
    if (name) {
      this.chatUser = { name: '' };
      this.chatUser.name = name;
      if (avatar) this.chatUser.avatar = avatar;
    }
    this.showChatbox = true;
  }

  /**
   * Removes self from dom
   */
  hideChatWindow() {
    this.showChatbox = false;
  }
}
