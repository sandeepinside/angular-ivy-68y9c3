import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TodoItem } from './todo.model';
@Component({
  selector: 'app-todo-list',
  templateUrl: `./todo-list.component.html`,
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() date: Date = new Date();
  @Input() items: TodoItem[] = [];

  public newItemName: string;
  public totalTasksToCompleteOnDate: number;
  public totalTasksRemainingOnDate: number = 0;
selectedTask: TodoItem;
  constructor() {}
  ngOnChanges() {
    this.updateTotalTasksToCompleteOnDate();
    this.setRemainingTasksToDoOnDate(this.date);
  }

  ngOnInit() {
    const currentTime = new Date().getTime();
    this.items?.forEach((item) => {
      if (item.totalDays) {
        const lastCompletionTime = new Date(
          this.date?.getFullYear(),
          this.date?.getMonth(),
          this.date?.getDate() - item.completedCount
        ).getTime();
        item.missedDays = Math.floor(
          (currentTime - lastCompletionTime) / (24 * 60 * 60 * 1000)
        );
      } else {
        item.missedDays = 0;
      }
    });

    this.setRemainingTasksToDoOnDate(this.date);
  }

  public updateTotalTasksToCompleteOnDate() {
    const nonRecurringTasksToCompleteOnDate =
      this.getNonRecurringTasksToCompleteOnDate(this.date);
    const recurringTasksToCompleteOnDate =
      this.getRecurringTasksToCompleteOnDate(this.date);
    this.totalTasksToCompleteOnDate =
      nonRecurringTasksToCompleteOnDate + recurringTasksToCompleteOnDate;
  }

  completeItem(item: TodoItem) {
    debugger;
    if (item.totalDays && item.completedCount >= item.totalDays) {
      return;
    }
    if (!item.completedOn) {
      item.completedOn = [];
    }
    if (item.completedCount > 0) {
      item.completedOn = item.completedOn.filter((date) => date.toDateString() !== this.date.toDateString());
    } else {
      item.completedOn.push(this.date);
    }
    item.completedCount += item.completedCount > 0 ? -1 : 1;
    this.updateTotalTasksToCompleteOnDate();
    this.setRemainingTasksToDoOnDate(this.date);
  }
  
  
  get totalEstimated(): number {
    return this.items.reduce((total, item) => total + item.duration, 0);
  }

  get elapsedTime(): number {
    return this.items.reduce(
      (total, item) => total + item.completedCount * item.duration,
      0
    );
  }

  get completedTasks(): number {
    return this.items.filter((item) => item.completedCount > 0).length;
  }

  addItem() {
    if (!this.newItemName) {
      return;
    }

    const newItem: TodoItem = {
      name: this.newItemName,
      duration: 0,
      completedCount: 0,
      missedDays: 0,
      totalDays: 0,
    };

    this.items.push(newItem);
    this.setRemainingTasksToDoOnDate(this.date);
  }

  public setRemainingTasksToDoOnDate(selectedDate: Date): void {
    this.totalTasksRemainingOnDate = 0;

    for (const item of this.items) {
      // Check if task is non-recurring
      if (!item.recurrence) {
        if (item.completedCount < 1) {
          this.totalTasksRemainingOnDate += 1;
        }
      } else {
        // Check if task is set to repeat on selected date
        let repeatsOnSelectedDate = false;
        if (item.recurrence === 'daily') {
          repeatsOnSelectedDate = true;
        } else if (item.recurrence === 'weekly') {
          if (item.dayOfWeek === selectedDate?.getDay()) {
            repeatsOnSelectedDate = true;
          }
        } else if (item.recurrence === 'monthly') {
          if (item.dayOfMonth === selectedDate?.getDate()) {
            repeatsOnSelectedDate = true;
          }
        }

        // If task repeats on selected date and has not been completed on that date, increment remaining tasks count
        if (
          repeatsOnSelectedDate &&
          !item.completedOn?.includes(selectedDate)
        ) {
          this.totalTasksRemainingOnDate += 1;
        }
      }
    }
  }

  getTotalTasksToCompleteOnDate(date: Date): number {
    const nonRecurringTasksToCompleteOnDate =
      this.getNonRecurringTasksToCompleteOnDate(date);
    const recurringTasksToCompleteOnDate =
      this.getRecurringTasksToCompleteOnDate(date);
    return nonRecurringTasksToCompleteOnDate + recurringTasksToCompleteOnDate;
  }
  getRecurringTasksToCompleteOnDate(date: Date = new Date()): number {
    return this.items.reduce((total, item) => {
      if (item.recurrence) {
        let isTaskDueOnDate = false;
        if (item.recurrence === 'daily') {
          isTaskDueOnDate = true;
        } else if (item.recurrence === 'weekly') {
          isTaskDueOnDate = item.dayOfWeek === date.getDay();
        } else if (item.recurrence === 'monthly') {
          isTaskDueOnDate = item.dayOfMonth === date.getDate();
        }

        if (isTaskDueOnDate) {
          if (item.totalDays) {
            const lastCompletionTime = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() - item.completedCount
            ).getTime();
            const missedDays = Math.floor(
              (date.getTime() - lastCompletionTime) / (24 * 60 * 60 * 1000)
            );
            if (missedDays > 0) {
              total++;
            }
          } else {
            total++;
          }
        }
      }
      return total;
    }, 0);
  }

  getNonRecurringTasksToCompleteOnDate(date: Date = new Date()): number {
    return this.items.reduce((total, item) => {
      if (!item.recurrence) {
        if (item.totalDays) {
          const lastCompletionTime = new Date(
            date?.getFullYear(),
            date?.getMonth(),
            date?.getDate() - item.completedCount
          ).getTime();
          const missedDays = Math.floor(
            (date.getTime() - lastCompletionTime) / (24 * 60 * 60 * 1000)
          );
          if (missedDays > 0) {
            total++;
          }
        } else {
          total++;
        }
      }
      return total;
    }, 0);
  }

  startTimer(item: TodoItem) {
    item.startTime = new Date();
    this.selectedTask = item;
  }

  stopTimer(item: TodoItem) {
    const elapsed = new Date().getTime() - item.startTime.getTime();
    item.duration += elapsed / (60 * 60 * 1000); // convert elapsed time from milliseconds to hours
    item.startTime = null;
    this.selectedTask = null;
  }

}
