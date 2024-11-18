import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailChatUser } from '../email.model';

@Component({
  selector: 'app-email-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @Input() chatUser?: EmailChatUser;
  @Output() hideChatWindow = new EventEmitter<void>();

  constructor () { }

  ngOnInit(): void {
  }

  /**
   * Hide chat window
   */
  hide(): void {
    this.hideChatWindow.emit();
  }

}
