import { Component, Input } from '@angular/core';
import { TodoItem } from './todo.model';

@Component({
  selector: 'app-selected-task',
  template: `
    <div *ngIf="selectedTask">
      <p>Elapsed Time: {{ calculateElapsedTime(selectedTask) }}</p>
      <p>Task Name: {{ selectedTask.name }}</p>
      <p>Duration: {{ selectedTask.duration }} hours</p>
      <p>Completed: {{ selectedTask.completedCount }} times</p>
      <p>Missed Days: {{ selectedTask.missedDays }}</p>
    </div>
  `,
})
export class SelectedTaskComponent {
  @Input() selectedTask: TodoItem;

  public calculateElapsedTime(item: TodoItem): string {
    const elapsedTime = new Date().getTime() - item.startTime.getTime();
    const hours = Math.floor(elapsedTime / (60 * 60 * 1000));
    const minutes = Math.floor(
      (elapsedTime - hours * 60 * 60 * 1000) / (60 * 1000)
    );
    return `${hours}:${minutes}`;
  }
}
