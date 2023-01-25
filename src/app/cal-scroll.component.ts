import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-scroll',
  template: `
  <div class="calendar-scroll">
  <div class="calendar-scroll-month-year">
    {{ selectedDate | date: 'MMM yyyy' }}
  </div>
  <div class="calendar-scroll-bar">
    <div class="calendar-scroll-arrow left" (click)="scrollLeft()">&lt;</div>
    <div class="calendar-scroll-date"
         *ngFor="let date of dates | slice:0:7"
         [attr.data-day]="date | date: 'EEE'"
         [ngClass]="{'calendar-scroll-current-date': date.getTime() === currentDate.getTime(),
                     'calendar-scroll-selected-date': date.getTime() === selectedDate.getTime()}"
         (click)="selectDate(date)">
      <span>{{ date | date: 'EEE' }}</span>
      <span>{{ date | date: 'd' }}</span>
    </div>
    <div class="calendar-scroll-arrow right" (click)="scrollRight()">&gt;</div>
  </div>
</div>

  
  `,
  styleUrls: ['./cal-scroll.component.scss'],
})
export class CalendarScrollComponent implements OnInit {
  currentDate = new Date();
  selectedDate = new Date();
  dates = [this.currentDate];
  @Output() selected = new EventEmitter<Date>();
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.dates = [this.currentDate];
    for (let i = 1; i < 4; i++) {
      this.dates.unshift(
        new Date(this.currentDate.getTime() - i * 24 * 60 * 60 * 1000)
      );
      this.dates.push(
        new Date(this.currentDate.getTime() + i * 24 * 60 * 60 * 1000)
      );
    }
    this.selectDate(this.currentDate);
  }

  scrollRight() {
    this.dates = this.dates.map(
      (date) => new Date(date.getTime() + 24 * 60 * 60 * 1000)
    );
  }

  scrollLeft() {
    this.dates = this.dates.map(
      (date) => new Date(date.getTime() - 24 * 60 * 60 * 1000)
    );
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selected.emit(date);
  }
}
