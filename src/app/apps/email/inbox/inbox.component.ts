import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { EMAILS } from '../shared/data';
import { Email } from '../shared/email.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  emailList: Email[] = [];
  unreadEmails: Email[] = [];
  importantEmails: Email[] = [];
  otherEmails: Email[] = [];
  startIndex: number = 1;
  endIndex: number = 20;
  totalEmails: number = EMAILS.length;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Email', path: '/' }, { label: 'Email Inbox', path: '/', active: true }];
    this._fetchData();
  }

  /**
  * Fetches the email data
  */
  _fetchData() {
    this.emailList = [...EMAILS];
    this.unreadEmails = this.emailList.filter((t: Email) => !t.is_read);
    this.importantEmails = this.emailList.filter((t: Email) => t.is_important);
    this.otherEmails = this.emailList.filter((t: Email) => (t.is_read && !t.is_important));
  }

  /**
   * get previous page
   */
  getPrevPage(): void {
    this.startIndex = this.startIndex - 20;
    this.endIndex = this.endIndex - 20;
  }

  /**
   * get next page
   */
  getNextPage(): void {
    this.startIndex = this.startIndex + 20;
    this.endIndex = this.endIndex + 20;
  }

  /**
   * get start index for other emails
   */
  getStartIndex(): number {
    let start = this.startIndex - 1;
    if (start === 0) {
      return start
    }
    else {
      return (start - this.unreadEmails.length - this.importantEmails.length)
    }
  }

  /**
   * get end index for other emails
   */
  getEndIndex(): number {
    let end = this.endIndex;
    return end - this.unreadEmails.length - this.importantEmails.length;

  }

}
