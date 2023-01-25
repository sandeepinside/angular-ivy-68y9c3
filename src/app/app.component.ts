import { Component, OnInit, VERSION } from '@angular/core';
import { TodoItem } from './todo-list/todo.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  selectedDate: Date;
  todoItems: TodoItem[];
  selectedTask: TodoItem;
  ngOnInit() {
    this.selectedDate = new Date();
  }
  public setSelectedDate(selectedDate) {
    this.selectedDate = selectedDate;
    this.todoItems = this.generateMockTodoItems();
  }

  generateMockTodoItems(): TodoItem[] {
    return [
      {
        name: 'Task 1',
        duration: 1,
        completedCount: 1,
        missedDays: 0,
        totalDays: 0,
        recurrence: 'daily',
        completedOn: [new Date('2020-12-10')],
      },
      {
        name: 'Task 2',
        duration: 2,
        completedCount: 2,
        missedDays: 0,
        totalDays: 0,
        recurrence: 'weekly',
        dayOfWeek: 2,
        completedOn: [new Date('2020-12-10'), new Date('2020-12-17')],
      },
      {
        name: 'Task 3',
        duration: 3,
        completedCount: 3,
        missedDays: 0,
        totalDays: 0,
        recurrence: 'monthly',
        dayOfMonth: 10,
        completedOn: [new Date('2020-12-10'), new Date('2021-01-10'), new Date('2021-02-10')],
      },
      {
        name: 'Task 4',
        duration: 4,
        completedCount: 0,
        missedDays: 0,
        totalDays: 4,
        completedOn: [],
      },
    ];
  }
  
}
