import { Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { ChatMessage, ChatUser } from '../shared/chat.model';
import { CHATHISTORY } from '../shared/data';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {


  @Input() selectedUser!: ChatUser;

  loading: boolean = false;
  chatHistory: ChatMessage[] = [];
  toUser!: ChatUser;
  newMessage: string = '';


  @ViewChild('chatForm', { static: true }) chatForm: any;

  constructor (private activeModal: NgbModal) { }

  ngOnInit(): void {
    // initialiize data
    this.initData();
  }


  /**
   * loads message for new chat user
   * @param changes chat user change
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedUser.currentValue !== changes.selectedUser.previousValue) {
      this.chatHistory = [...CHATHISTORY];
      this.loading = true;
      setTimeout(() => {


        this.chatHistory = [...this.chatHistory].map((record, index) => {
          let temp: ChatMessage = {
            id: record.id,
            day: record.day,
            messages: (record.messages.filter(m => (m.to.id === this.toUser.id && m.from.id === this.selectedUser.id) || (this.toUser.id === m.from.id && m.to.id === this.selectedUser.id)))
          }
          return temp
        })

        this.loading = false;
      }, 750);

    }
  }


  /**
   * set user
   */
  initData(): void {
    this.toUser = {
      id: 9,
      name: 'Shreyu N',
      avatar: 'assets/images/users/avatar-2.jpg'
    }
  }

  /**
   * opens modal
   * @param content modal reference
   */
  openModal(content: TemplateRef<NgbModal>, size?: string, contentClass?: string): void {
    this.activeModal.open(content, { centered: true, size: size || '' });
    if (contentClass) {
      document.getElementById(contentClass)?.parentElement?.classList.add(contentClass);
    }

  }

  /** 
   * add new message 
   */
  sendChatMessage(): void {
    const modifiedMessages = [...this.chatHistory[this.chatHistory.length - 1].messages];
    modifiedMessages.push({
      id: modifiedMessages.length + 1,
      from: this.toUser,
      to: this.selectedUser,
      messages: [
        { type: 'text', value: this.newMessage }
      ],
      sendOn: new Date().getHours() + ':' + new Date().getMinutes()
    });
    this.chatHistory[this.chatHistory.length - 1].messages = modifiedMessages;
    this.chatForm.resetForm();
  }

}
