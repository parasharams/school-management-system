import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { ChatUser } from '../shared/chat.model';
import { USERS } from '../shared/data';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  loggedInUser: any = {};
  userList: ChatUser[] = [];
  @Input() selectedUser!: ChatUser;
  searchUser: string = '';


  //On selecting new user
  @Output() selectUser: EventEmitter<ChatUser> = new EventEmitter();

  constructor (private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser();

    // Get users for chat
    this._fetchUsers();
  }

  /**
   *  Fetches user list for chat
   */
  _fetchUsers(): void {
    this.userList = USERS;
  }

  /**
   * changes active user
   * @param user chat user
   */
  activateUser(user: ChatUser): void {
    this.selectedUser = user;
    this.selectUser.emit(this.selectedUser);
  }

  /**
   * search user from list of users
   */
  search(): void {
    this.userList = this.searchUser === '' ? [...USERS] : [...USERS].filter(u => u.name!.toLowerCase().indexOf(this.searchUser.toLowerCase()) >= 0);
  }


}
