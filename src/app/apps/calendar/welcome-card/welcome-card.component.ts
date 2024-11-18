import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {

  @Output() createNewEvent = new EventEmitter<void>();

  constructor () { }

  ngOnInit(): void {
  }

  /**
   * open modal of new event
   */
  openModal(): void {
    this.createNewEvent.emit();
  }

}
